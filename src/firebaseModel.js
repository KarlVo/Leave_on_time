import {reaction} from 'mobx';
import {initializeApp} from 'firebase/app';
import {onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import {getDatabase, ref, get, set} from 'firebase/database';

import firebaseConfig from "/src/firebaseConfig.js";

export default function connectToFirebase(model) {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

    const provider = new GoogleAuthProvider();
    document.getElementById('auth').addEventListener('click', () => {
        if (auth.currentUser) {
            signOut(auth).then(() => {
                window.location.reload(false);
                window.location.hash='';
            });
        } else {
            signInWithPopup(auth, provider).then(() => {
                window.location.reload(false);
                window.location.hash='';
            });
        }
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            model.user = user;
            readFromFirebase();
        } else {
            model.user = null;
        }
    });

    function readFromFirebase() {
        model.ready = false;

        if (model.user) {
            return (
                get(
                    ref(db, model.user.uid)
                ).then(
                    (snapshot) => {
                        return persistenceToModel(snapshot.val());
                    }
                ).then(
                    () => {
                        model.ready = true;
                    }
                )
            );
        }
    }

    function persistenceToModel(data) {
        if (!data) {
            return Promise.resolve();
        }

        if (data.currentLocationFB) {
            model.currentLocation = data.currentLocationFB;
        }

        if (data.locationsFB) {
            data.locationsFB.forEach((locationFB) => {
                if (!locationFB.routes) {
                    locationFB.routes = [];
                }
            });
            model.locations = data.locationsFB;
        }
    }

    reaction(checkACB, effectACB);

    function checkACB() {
        return ([
            model.locations,
            model.currentLocation
        ]);
    }

    function effectACB() {
        saveToFirebase();
    }

    function saveToFirebase() {
        if (model.ready === true && model.user) {
            set(
                ref(db, '/'+model.user.uid), modelToPersistence()
            );
        }
    }

    function modelToPersistence(){
        return ({
            currentLocationFB: model.currentLocation,
            locationsFB: model.locations,
        });
    }

}