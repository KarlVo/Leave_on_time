import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/testFirebase.js";
import {  } from "./timetableSource";
// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

const REF= "model";
const PATH="dinnerModel126";
const rf= ref(db, PATH);

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number

set(ref(db, PATH+"/test"), "dummy");



// Add relevant imports here 
// TODO

// Initialise firebase app, database, ref
// TODO

function observerRecap(/*TODO*/) {
    //TODO
}

function modelToPersistence(model/* TODO */){
    // TODO return an object
    return {
        currentLocationFB: model.currentLocation, //det här ÄR redan id
        locationsFB: model.locations,
        //dishesID:    model.dishes.map(dish => dish.id).sort((a, b) => a - b) //här vill jag endast ha id av dish arrayen och sen sorterar jag de
        addingLocationFB: model.addingLocation,

        commuteStationsFB: model.commuteStations,
        commuteDistancesFB: model.commuteDistances,
        intrestedLinesFB: model.intrestedLines,

        currentIDFB: model.currentID,
        currentStationFB: model.currentStation,
        stationsFB: model.stations,
        myStationsFB: model.myStations,

    };
}

function persistenceToModel(data, model/* TODO */) {
    // TODO return a promise

    // Check if data is falsy or empty
    if (!data) {

        model.currentLocation = null; //9304
        model.locations = [];
        model.addingLocation = false;
        model.commuteStations = [];
        model.commuteDistances = [];
        model.intrestedLines = [];
        model.currentID = null;
        model.currentStation = null;
        model.stations = [];
        model.myStations = [];
        return Promise.resolve(); // Return a resolved promise for an empty database
    }

    //!currentLocation
    if (data.currentLocationFB === null || data.currentLocationFB === undefined) {
        model.currentLocation = null;
    } else {
        model.currentLocation = data.currentLocationFB;
    }

    //!locations
    if(!data.currentIDFB){
        model.currentID = 9304;
    }
    else{
    model.currentID = data.currentIDFB;
    }
    //console.log("testish", data.dishesID)

    if (data.currentID){
        
    return getMenuDetails(data.dishesID)
        .then(saveToModelACB)
    }
        // .then(() => getDishDetails(data.currentDishFB))
        // .then(saveToModel2ACB);

    function saveToModelACB(param) {
        model.dishes = param;
    }

    function saveToModel2ACB(param) {
        model.currentDish = param;
    }
}

function saveToFirebase(model){
    // TODO
    if (model.ready === true){
    set(rf, modelToPersistence(model))
    //set(rf, modelToPersistence({numberOfGuests:5, currentDish:13, dishes:[{id:13}, {id:42}]}))
}

}
function readFromFirebase(model){
    // TODO
    model.ready=false;
    return get(rf)
              .then(function convertACB(snapshot){
                     // return promise
                     return persistenceToModel(snapshot.val(), model); //första parametern är data
               })
              .then(function setModelReadyACB(){
                          model.ready=true;
              })           
}




function connectToFirebase(model, watchFunction) {
    // Read the model from firebase when the app starts
    readFromFirebase(model);

    // Save the model to firebase whenever model's numberOfGuests, dishes, or currentDish change
    watchFunction(checkACB, effectACB);

    function checkACB() {
        // Return a combination of model properties, e.g., an array
        return [model.numberOfGuests, model.dishes, model.currentDish];
    }

    function effectACB() {
        // Save the model to firebase when ACB1 result changes (i.e., when model properties change)
        saveToFirebase(model);
    }
}





export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}
export default connectToFirebase;
