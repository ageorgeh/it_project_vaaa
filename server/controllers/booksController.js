/* eslint-disable no-unused-vars */
const { db } = require('../models/admin')

// CREATE: add a new book
const addNewBook = async function (req, res) {
  // const { currUID, title, author, shelves, image } = req.body
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const title = req.body.title || ''
  const author = req.body.author || ''
  const shelves = req.body.shelves || []
  const image = req.body.image || 'noImageFound.jpg'

  const newBookRef = db.collection('books').doc()
  const res2 = await newBookRef.set({
    bookID: newBookRef.id,
    uid: currUID,
    title,
    author,
    image,
    shelves: Array.from(new Set(shelves.concat(['All Books'])))

  }, { merge: true })
  console.log('New book created')
  res.status(200).send(newBookRef.id)
}

// READ: get books data by user id
const getUserBooks = async function (req, res) {
  const { currUID } = req.body
  const booksRef = db.collection('books')
  const booksRes = await booksRef.get()
  const books = []
  booksRes.forEach(doc => {
    books.push(doc.data())
  })
  // filter on currUID
  const booksByUID = books.filter(book => book.uid === currUID)
  res.send(booksByUID)
}

const getBookFromID = async function (req, res) {
  const { currUID, bookID } = req.body
  const booksRef = db.collection('books').doc(bookID)
  const doc = await booksRef.get()
  if (!doc.exists) {
    console.log('No such document!')
  } else {
    console.log('Document data:', doc.data())
  }

  res.send(doc.data())
}
// UPDATE: change a book's title
const updateTitle = async function (req, res) {
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const title = req.body.title || ''
  const author = req.body.author || ''
  const shelves = req.body.shelves || []
  const image = req.body.image || 'noImageFound.jpg'
  const bookID = req.body.bookID
  console.log('bookid,', req.body)
  const bookRef = db.collection('books').doc(bookID)
  const res2 = await bookRef.set({
    bookID,
    currUID,
    title,
    author,
    image,
    shelves
  }, { merge: true })
  res.status(200).send('Updated title to' + title + ' for bookID ' + bookID)
}

// DELETE: deletes a book
const deleteBook = async function (req, res) {
  const { bookID } = req.body
  const bookRef = db.collection('books').doc(bookID).delete()
  res.status(200).send('Deleted book with bookID ' + bookID)
}

module.exports = {
  addNewBook,
  getUserBooks,
  updateTitle,
  deleteBook,
  getBookFromID
}
