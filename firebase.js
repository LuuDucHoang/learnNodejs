const { initializeApp, cert }  = require("firebase-admin/app");
const { getFirestore} = require('firebase-admin/firestore')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const serviceAccount =  require('./creds.json')
initializeApp({
    credential: cert(serviceAccount)
})
const firebaseConfig = {
  apiKey: "AIzaSyDS9-W9CHUfffW99oau5fRZYvYfohDhyAo",
  authDomain: "crud-node-da255.firebaseapp.com",
  projectId: "crud-node-da255",
  storageBucket: "crud-node-da255.appspot.com",
  messagingSenderId: "1097857092146",
  appId: "1:1097857092146:web:71323f59091b0f06d24a2b"
};
const  db = getFirestore()
// Initialize Firebase

module.exports = {db}