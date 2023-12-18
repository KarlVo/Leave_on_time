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

onAuthStateChanged(auth, loginOrOutACB);
    //demo render
    function loginOrOutACB(user){
        appDiv.innerHTML="user "+(user?" ID "+user.uid:user);
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

const reactiveModel = observable(model);
window.myModel= reactiveModel; // For debugging

createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel}/>);
connectToFirebase(reactiveModel, reaction);