/* eslint-disable no-unused-vars */

const express = require('express');
const cors = require('cors');
const app = express();
const {db} = require('./models/firebase.js');

const port = process.env.PORT || 3001;
// Enable cors security headers
app.use(cors());

// add an express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MyBooks page routes
// CREATE: add a new book
app.post('/MyBooks/AddNewBook', async (req, res) => {
  const {currUID, title} = req.body;


  const newBookRef = db.collection('books').doc();
  const res2 = await newBookRef.set({
    bookID: newBookRef.id,
    uid: currUID,
    title: title,
  }, {merge: true});
  res.status(200).send('Added new book ' + title + ' for user ' + currUID );
});

// READ: get books data by user id
app.get('/MyBooks', async (req, res) => {
  console.log(req.body['currUID']);
  const {currUID} = req.body;
  const booksRef = db.collection('books');
  const booksRes = await booksRef.get();
  const books = [];
  booksRes.forEach((doc) => {
    books.push(doc.data());
  });
  // filter on currUID
  const booksByUID = books.filter((book) => book.uid == currUID);
  res.send(booksByUID);
});

// UPDATE: change a book's title
app.post('/MyBooks/UpdateTitle', async (req, res) => {
  const {bookID, currUID, newTitle} = req.body;
  const bookRef = db.collection('books').doc(bookID);
  const res2 = await bookRef.set({
    bookID: bookID,
    currUID: currUID,
    title: newTitle,
  }, {merge: true});
  res.status(200).send('Updated title to' +
  newTitle + ' for bookID ' + bookID );
});

// DELETE: deletes a book
app.post('/MyBooks/DeleteBook', async (req, res) => {
  const {bookID} = req.body;
  const bookRef = db.collection('books').doc(bookID).delete();
  res.status(200).send('Deleted book with bookID ' + bookID );
});

// home page
app.get('/', (req, res) => {
  res.send('Hi There');
});

// get all of the books in the database
app.get('/get', (req, res) => {
  res.send('the response from the get call');
});

// add a book to the database
app.post('/insert', (req, res) => {
  res.send('post');
});

// delete a book from the database
app.delete('/delete/:bookId', (req, res) => {
  res.send('delete');
});

// update a book review
app.put('/update/:bookId', (req, res) => {
  res.send('put');
});

app.listen(port, () => { });
