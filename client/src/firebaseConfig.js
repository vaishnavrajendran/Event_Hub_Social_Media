// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/database'
// import 'firebase/compat/storage'
// // import { initializeApp } from 'firebase/app';
// // import { getStorage } from "firebase/storage";
// import { getAuth } from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDljaTbhZsvqW6gP3cxP7GjQdN4IaR6sAk",
//   authDomain: "eventhub-19ef7.firebaseapp.com",
//   projectId: "eventhub-19ef7",
//   storageBucket: "eventhub-19ef7.appspot.com",
//   messagingSenderId: "183670526977",
//   appId: "1:183670526977:web:a45bc253d16b4dfa715c00"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export const dataref = firebase.database();
// export const storage = firebase.storage();
// export const authentication = getAuth(firebase.initializeApp(firebaseConfig))
// export default firebase;

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB19KyK_2mH1SMx_tX9bY5Bl40-DHWGSRs",
  authDomain: "event-hub-2a8e7.firebaseapp.com",
  projectId: "event-hub-2a8e7",
  storageBucket: "event-hub-2a8e7.appspot.com",
  messagingSenderId: "803268592437",
  appId: "1:803268592437:web:006b1103303859edd5427c",
  measurementId: "G-LNLL51404Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const storage = firebase.storage();
export const authentication = getAuth(firebase.initializeApp(firebaseConfig))
export default firebase;