// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'
// import { initializeApp } from 'firebase/app';
// import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDljaTbhZsvqW6gP3cxP7GjQdN4IaR6sAk",
  authDomain: "eventhub-19ef7.firebaseapp.com",
  projectId: "eventhub-19ef7",
  storageBucket: "eventhub-19ef7.appspot.com",
  messagingSenderId: "183670526977",
  appId: "1:183670526977:web:a45bc253d16b4dfa715c00"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const storage = firebase.storage();
export const authentication = getAuth(firebase.initializeApp(firebaseConfig))
export default firebase;