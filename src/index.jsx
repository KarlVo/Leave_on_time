import {observable, configure, reaction} from 'mobx';
import {createRoot} from 'react-dom/client';
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import connectToFirebase from '/src/firebaseModel.js';
import firebaseConfig from "/src/firebaseConfig.js";

import model from '/src/model/CommuteModel.js';
import App from '/src/App.jsx';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById('auth').addEventListener('click', function clickACB(){
    auth.currentUser? signOut(auth): signInWithPopup(auth, provider);
});

configure({enforceActions: 'never'});


const reactiveModel = observable(model);
console.log(auth);
createRoot(document.getElementById('root')).render(<App model={reactiveModel}/>);

window.myModel = reactiveModel; // For debugging
// window.auth = auth
// window.provider = provider
connectToFirebase(reactiveModel, reaction, auth);