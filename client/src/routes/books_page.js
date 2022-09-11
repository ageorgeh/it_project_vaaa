const express = require("express");
const cors = require("cors");
const Books = require("../../client/src/models/books");
const app = express();
app.use(express.json());
app.use(cors());

// get uid from users
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
const books_list = []
app.get("/mybooks", async (req, res) => {
    const snapshot = await Books.get();
    const books_list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(books_list);
  });

//console.log(books_list)
//export{books_list}
module.exports = {app, books_list}