//import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/testFirebase.js";
import {getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';

import firebaseConfig from "/src/firebaseConfig.js";

const app= initializeApp(firebaseConfig);
const db= getDatabase(app);

function modelToPersistence(model){
    return {
        currentLocationFB: model.currentLocation,
        locationsFB: model.locations,
    };
}

function persistenceToModel(data, model) {
    // Check if data is falsy or empty
    if (!data) {
        model.currentLocation = 1;
        return Promise.resolve();
    }

    //!currentLocation
    if (data.currentLocationFB === null || data.currentLocationFB === undefined) {
        model.currentLocation = 1;
    } else {
        model.currentLocation = data.currentLocationFB;
    }

    //!locations
    if (data.locationsFB) {
        data.locationsFB.forEach((location) => {
            if (!location.routes) {
                location.routes = [];
            }
        });
        model.locations = data.locationsFB;
    }
}

function saveToFirebase(model){
    console.log("saveToFirebase");

    if (model.ready === true && model.user){
        set(ref(db, '/'+model.user.uid), modelToPersistence(model));
    }

}
function readFromFirebase(model){
    // TODO
    model.ready=false;
    if(model.user){
        //read from "path/"+model.user.uid
        //set(ref(db, +"/"+model.user.uid), modelToPersistence(model));
        
        return get(ref(db, model.user.uid))
                .then(function convertACB(snapshot){
                // return promise
                    return persistenceToModel(snapshot.val(), model); //första parametern är data
                })
                .then(function setModelReadyACB(){
                    model.ready=true;
        })      
    }     
}




function connectToFirebase(model, watchFunction, auth) {
    // Read the model from firebase when the app starts
    console.log("testavfb", model.user);
    //const PATH= model.user.uid;
    //const PATH= "8dFN1eLoE8eovVPNvNxdQ7DV6U93"
    //const rf= ref(db, PATH);
    onAuthStateChanged(auth, loginOrOutACB);
    
    function loginOrOutACB(user) {
        //document.getElementById('app').innerHTML = "user " + (user ? " ID " + user.uid : user);

    
        if (user) {
                model.user = user;
                console.log("user is: ", model.user);
                model.ready = false;
                readFromFirebase(model);
            // Connect to Firebase only if the user is truthy
        } else {
            // If user is falsy, wipe user data
            model.user = null;
        }
    }


    //readFromFirebase(model);
    //! here we need an ACB that is passed to onAuthStateChanged
    // onAuthStateChanged(auth, authACB);
    // function authACB(user){
    watchFunction(checkACB, effectACB);

    function checkACB() {
        // Return a combination of model properties, e.g., an array
        return [model.locations, model.currentLocation];
    }

    function effectACB() {
        // Save the model to firebase when ACB1 result changes (i.e., when model properties change)
        saveToFirebase(model);
    }
}






export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}
export default connectToFirebase;
