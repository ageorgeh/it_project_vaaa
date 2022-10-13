/* eslint-disable no-unused-vars */
const { db } = require('../models/admin')
const Joi = require('joi')

const bookSchema = Joi.object().keys({
  bookID: Joi.string(),
  uid: Joi.string(),
  title: Joi.string().optional().allow(''),
  author: Joi.string().optional().allow(''),
  image: Joi.string(),
  shelves: Joi.array().items(Joi.string()),
  rating: Joi.number().min(0).max(5),
  description: Joi.string().optional().allow('')
})

// CREATE: add a new book
const addNewBook = async function (req, res) {
  // const { currUID, title, author, shelves, image } = req.body
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const title = req.body.title || ''
  const author = req.body.author || ''
  const shelves = req.body.shelves || []
  const image = req.body.image || 'noImageFound.jpg'
  const rating = req.body.rating || 0
  const description = req.body.description || ''

  const newBookRef = db.collection('books').doc()
  const data = {
    bookID: newBookRef.id,
    uid: currUID,
    title,
    author,
    image,
    shelves: Array.from(new Set(shelves.concat(['All Books']))),
    rating,
    description
  }

  const result = bookSchema.validate(data)
  const { value, error } = result
  const valid = error == null
  console.log(error)
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data
    })
  } else {
    const res2 = await newBookRef.set(data, { merge: true })
    res.status(200).send(newBookRef.id)
  }

  // const res2 = await newBookRef.set(data, { merge: true })
  // console.log('New book created')
  // res.status(200).send(newBookRef.id)
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
  const rating = req.body.rating || 0
  const description = req.body.description || ''

  const bookRef = db.collection('books').doc(bookID)

  const data = {
    bookID,
    uid: currUID,
    title,
    author,
    image,
    shelves: Array.from(new Set(shelves.concat(['All Books']))),
    rating,
    description
  }

  const result = bookSchema.validate(data)
  const { value, error } = result
  const valid = error == null
  console.log(error)
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data
    })
  } else {
    const res2 = await bookRef.set(data, { merge: true })
    res.status(200).send('Updated title to' + title + ' for bookID ' + bookID)
  }
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
