import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_X7caC1rciP_mJtYSr5tX1bTqLzHd-IY",
    authDomain: "veganrecipes-11631.firebaseapp.com",
    databaseURL: "https://veganrecipes-11631-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "veganrecipes-11631",
    storageBucket: "gs://veganrecipes-11631.appspot.com",
    messagingSenderId: "812335520387"
}

const firebaseApp = firebase.default.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const fbstorage = firebaseApp.storage();
export const fbauth = firebaseApp.auth();
