// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getFirestore, collection } from "firebase/firestore"


// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyCzZhSdLCZCkYyMMzWYAlhv_IFBWkfyuQM",
  authDomain: "react-notes-1d89f.firebaseapp.com",
  projectId: "react-notes-1d89f",
  storageBucket: "react-notes-1d89f.appspot.com",
  messagingSenderId: "476741516796",
  appId: "1:476741516796:web:b0388ef6857c5f95df4679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const notesCollection = collection(db, "notes")