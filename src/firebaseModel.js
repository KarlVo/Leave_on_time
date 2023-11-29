import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import { getDishDetails, getMenuDetails } from "./dishSource";
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
        currentDishFB: model.currentDish, //det här ÄR redan id
        numberOfGuestsFB: model.numberOfGuests,
        dishesID:    model.dishes.map(dish => dish.id).sort((a, b) => a - b) //här vill jag endast ha id av dish arrayen och sen sorterar jag de
      };
}

function persistenceToModel(data, model/* TODO */) {
    // TODO return a promise

    // Check if data is falsy or empty
    if (!data) {
        model.currentDish = null;
        model.numberOfGuests = 2; // or whatever default value makes sense for your application
        model.dishes = []; // Assuming dishes should be an empty array

        return Promise.resolve(); // Return a resolved promise for an empty database
    }

    // Ensure data.currentDishFB is not null or undefined
    if (data.currentDishFB === null || data.currentDishFB === undefined) {
        model.currentDish = null;
    } else {
        model.currentDish = data.currentDishFB;
    }

    
    if(!data.numberOfGuestsFB){
        model.numberOfGuests = 2;
    }
    else{
    model.numberOfGuests = data.numberOfGuestsFB;
    }
    //console.log("testish", data.dishesID)

    if (data.dishesID){
        
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
