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
  const { currUID, newTitle } = req.body
  const randomString = (Math.random() + 1).toString(36).substring(7);
  const newBookRef = db.collection('books').doc(randomString)
  const res2 = await newBookRef.set({
      uid: currUID,
      title: newTitle
  }, { merge: true })
  res.status(200).send('Added new book ' + newTitle + ' for user ' + currUID )
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