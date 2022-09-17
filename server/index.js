const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('./firebase.js')

const port = process.env.PORT || 3001;
// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// CREATE: add a new book
app.post('/MyBooks/AddNewBook', async (req, res) => {
  const { currUID, title } = req.body
  const bookID = (Math.random() + 1).toString(36).substring(7);
  const newBookRef = db.collection('books').doc(bookID)
  const res2 = await newBookRef.set({
      bookID : bookID,
      uid: currUID,
      title: title
  }, { merge: true })
  res.status(200).send('Added new book ' + title + ' for user ' + currUID )
})

// UPDATE: change a book's title
app.post('/MyBooks/UpdateTitle', async (req, res) => {
  const { bookID, newTitle } = req.body
  const bookRef = db.collection('books').doc(bookID)
  const res2 = await bookRef.set({
      title: newTitle
  }, { merge: true })
  res.status(200).send('Updated title to' + newTitle + ' for bookID ' + bookID )
})

// DELETE: delete a book
app.post('/MyBooks/DeleteBook', async (req, res) => {
  const {bookID} = req.body
  const bookRef = db.collection('books').doc(bookID).delete();
  res.status(200).send('Deleted book with bookID ' + bookID )
})

// home page
app.get('/', (req, res) => {
  res.send('Hi There')
});

// get all of the books in the database
app.get('/get', (req, res) => {
  res.send('the response from the get call')
})

// add a book to the database
app.post("/insert", (req, res) => {
  res.send('post')
})

// delete a book from the database
app.delete("/delete/:bookId", (req, res) => {
  res.send('delete')
})

// update a book review
app.put("/update/:bookId", (req, res) => {
  res.send('put')
})

app.listen(port, () => { })