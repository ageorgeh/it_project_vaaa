/* eslint-disable no-unused-vars */
const { db } = require('../models/admin')

const setupNewGoogleUser = async function (req, res) {
  const user = req.body.user
  const userRef = db.collection('users').doc(user.uid)
  const doc = await userRef.get()

  if (!doc.exists) {
    userRef.set({
      uid: user.uid,
      name: user.displayName || '',
      authProvider: 'google',
      email: user.email
    })

    const newShelfRef = db.collection('shelves').doc()
    const res2 = await newShelfRef.set({
      shelfID: newShelfRef.id,
      uid: user.uid,
      name: 'All Books'

    }, { merge: true })
    console.log('new user added')
    res.status(200).send('New user added')
  } else {
    res.status(200).send('User already exists')
  }
}

// CREATE: add a new book
const addNewShelf = async function (req, res) {
  // const { currUID, title, author, shelves, image } = req.body
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const name = req.body.name
  const newShelfRef = db.collection('shelves').doc()
  const res2 = await newShelfRef.set({
    shelfID: newShelfRef.id,
    uid: currUID,
    name

  }, { merge: true })
  console.log('New shelf created')
  res.status(200).send(newShelfRef.id)
}

// READ: get books data by user id
const getUserShelves = async function (req, res) {
  const { currUID } = req.body
  const shelvesRef = db.collection('shelves')
  const shelvesRes = await shelvesRef.get()
  const shelves = []
  shelvesRes.forEach(doc => {
    shelves.push(doc.data())
  })

  const shelvesByUID = shelves.filter(shelf => shelf.uid === currUID)
  res.send(shelvesByUID)
}

// UPDATE: change a book's title
const updateShelf = async function (req, res) {
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const name = req.body.name
  const shelfID = req.body.bookID
  console.log('shelfid,', req.body)
  const shelfRef = db.collection('shelves').doc(shelfID)
  const res2 = await shelfRef.set({
    shelfID,
    currUID,
    name
  }, { merge: true })
  res.status(200).send('Updated shelf to ' + name)
}

// DELETE: deletes a book
const deleteShelf = async function (req, res) {
  const { shelfID } = req.body
  const shelfRef = db.collection('shelves').doc(shelfID).delete()
  res.status(200).send(shelfID)
}

module.exports = {
  addNewShelf,
  getUserShelves,
  updateShelf,
  deleteShelf,
  setupNewGoogleUser
}
