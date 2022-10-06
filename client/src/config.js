const firebase = require("firebase/app")
const auth = require("firebase/auth")
require("firebase/firestore")


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaeqcgpLuc8grPbbZreVXyYIWU8gfpp6k",
  authDomain: "it-project-vaah-dev.firebaseapp.com",
  projectId: "it-project-vaah-dev",
  storageBucket: "it-project-vaah-dev.appspot.com",
  messagingSenderId: "412593831296",
  appId: "1:412593831296:web:b6f1db57e42cc73cfe5565"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  firebase,
  auth
};