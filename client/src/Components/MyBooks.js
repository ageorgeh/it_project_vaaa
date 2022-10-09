/* eslint-disable no-unused-vars */

import ShelfPane from './ShelfPane'
import BookPane from './BookPane'
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'

function MyBooks () {
  // renavigate user to login if not logged in
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
  }, [user, loading, navigate])
  const loginOut = (user) => {
    if (user) {
      return <button onClick={logout}>
          Logout
      </button>
    }
  }

  const [BookData, setBookData] = useState([{}]) // Array of book objects sent from API
  const [r, setR] = useState(false) // Refresh state
  const [title, setTitle] = useState('') // Used for update title form
  const [books, setBooks] = useState([{}]) // Books array in format with mybooks page

  // getting all books and storing
  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
    const fetch = async () => {
      await axios.post('/MyBooks', {
        currUID: user.uid
      })
        .then(response => {
          setR(false)
          console.log(response)
          setBookData(response.data)
          console.log(BookData)
        })
        .catch(error => console.error('Error: ', error))
    }
    const addBooksToList = async () => {
      await fetch()
      // test book
      setBooks([{ title: BookData[0].title, author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'testbook.jpg' }])
    }
    addBooksToList()
  }, [user, loading, navigate, r])

  // const handleSubmit = event => {
  //   console.log('submit done')
  //   event.preventDefault()
  //   event.target.reset()
  // }

  // const handleChange = event => {
  //   setTitle(event.target.value)
  // }

  // adding a new book
  const addNewBook = (tit) => {
    setR(true)
    axios.post('/MyBooks/AddNewBook', {
      currUID: user.uid,
      title: tit
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error: ', error))
  }

  // edit book title
  const editBook = (book, tit) => {
    setR(true)
    axios.post('/MyBooks/UpdateTitle', {
      currUID: user.uid,
      newTitle: tit,
      bookID: book.bookID
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error: ', error))
  }

  // delete book
  const deleteBook = (id) => {
    setR(true)
    axios.post('/MyBooks/DeleteBook', {
      bookID: id
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error: ', error))
  }

  const [currShelf, setCurrShelf] = useState(0)
  const [shelves, setShelves] = useState(['All Books', 'Fiction', 'Non-Fiction', 'To-Read'])
  const [currShelfName, setCurrShelfName] = useState({})

  const selectShelf = (shelfKey) => {
    setCurrShelf(shelfKey)
    setCurrShelfName(shelves[shelfKey])
  }

  return (
    (typeof (BookData[0].title) === 'undefined')
      ? (
        <p> loading... </p>
        )
      : (
      <>
        <div className="flex relative bg-stone-900">
            <ShelfPane onSelect={selectShelf} shelves={shelves} />
            <BookPane
              currShelf={currShelf}
              currShelfName={shelves[currShelf]}
              books={books}
              />
        </div>
      </>
        ))
}

export default MyBooks
