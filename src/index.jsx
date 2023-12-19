import connectToFirebase from '/src/firebaseModel.js';
import {observable, configure, reaction} from 'mobx';
import {createRoot} from 'react-dom/client';
import { initializeApp } from "firebase/app";
import model from '/src/CommuteModel.js';
import ReactRoot from './reactjs/ReactRoot.jsx';
import firebaseConfig from "/src/firebaseConfig.js";

import {getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';

const app= initializeApp(firebaseConfig)

const auth= getAuth(app)
const appDiv = document.getElementById('app');
//console.log("auth.currentUser");
//console.log(auth.currentUser);
appDiv.innerHTML = auth.currentUser;

const provider = new GoogleAuthProvider();
document.getElementById("authButton").addEventListener("click", function clickACB(){
    auth.currentUser? signOut(auth): signInWithPopup(auth, provider);

});

// onAuthStateChanged(auth, loginOrOutACB);
//     //demo render
//     function loginOrOutACB(user){
//         appDiv.innerHTML="user "+(user?" ID "+user.uid:user);
        
//         if (user) {
//             model.user = user;
//             console.log("user is: ",model.user )
//             model.ready = false;
//             connectToFirebase(reactiveModel, reaction);
//         }
//     }

const reactiveModel = observable(model);


onAuthStateChanged(auth, loginOrOutACB);

function loginOrOutACB(user) {
    appDiv.innerHTML = "user " + (user ? " ID " + user.uid : user);

    if (user) {
        reactiveModel.user = user;
        console.log("user is: ", model.user);
        reactiveModel.ready = false;

        // Connect to Firebase only if the user is truthy
        connectToFirebase(reactiveModel, reaction);
    } else {
        // If user is falsy, wipe user data
        reactiveModel.user = null;
        reactiveModel.dishes = []; // Assuming dishes is an array property in your model
    }
}
   


configure({enforceActions: 'never'});
console.log("auth.currentUser");
console.log(auth.currentUser);
model.user=auth.currentUser;
console.log("model.user");
console.log(model.user);
if(auth.currentUser){
    
    console.log("auth.currentUser");
    console.log(auth.currentUser);
    reactiveModel.user=auth.currentUser;
    console.log("reactiveModel.user");
    console.log(reactiveModel.user);
    
}

window.myModel= reactiveModel; // For debugging

createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel}/>);
//connectToFirebase(reactiveModel, reaction);
