import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA_X7caC1rciP_mJtYSr5tX1bTqLzHd-IY",
  authDomain: "veganrecipes-11631.firebaseapp.com",
  databaseURL: "https://veganrecipes-11631-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "veganrecipes-11631",
  storageBucket: "veganrecipes-11631.appspot.com",
  messagingSenderId: "812335520387",
  appId: "1:812335520387:web:b271ce6f687f04477459b6",
  measurementId: "G-8XTYWBQEGR"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const categoriesRef = collection(db, 'Categories')