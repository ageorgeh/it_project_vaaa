const firebase = require("firebase");

const firebaseConfig = {
    apiKey: 'AIzaSyAaeqcgpLuc8grPbbZreVXyYIWU8gfpp6k',
    authDomain: 'it-project-vaah-dev.firebaseapp.com',
    projectId: 'it-project-vaah-dev',
    storageBucket: 'it-project-vaah-dev.appspot.com',
    messagingSenderId: '412593831296',
    appId: '1:412593831296:web:b6f1db57e42cc73cfe5565'
  }

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;

// const Books = db.collection("books"); // add user id in books collection
//module.exports = Books;