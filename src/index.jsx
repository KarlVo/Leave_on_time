import {observable, configure, reaction} from 'mobx';
import {createRoot} from 'react-dom/client';
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import connectToFirebase from '/src/firebaseModel.js';
import firebaseConfig from "/src/firebaseConfig.js";

import model from '/src/model/CommuteModel.js';
import App from '/src/App.jsx';

const app= initializeApp(firebaseConfig);

const auth= getAuth(app)
const appDiv = document.getElementById('app');
appDiv.innerHTML = auth.currentUser;

const provider = new GoogleAuthProvider();
document.getElementById("authButton").addEventListener("click", function clickACB(){
    auth.currentUser? signOut(auth): signInWithPopup(auth, provider);

});

configure({enforceActions: 'never'});

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
    }
}

createRoot(document.getElementById('root')).render(<App model={reactiveModel}/>);

window.myModel = reactiveModel; // For debugging