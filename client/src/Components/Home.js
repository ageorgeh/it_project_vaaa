import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'

export default function Home () {
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

  const [BookData, setBookData] = useState([{}])
  const [r, setR] = useState([{}])
  const [title, setTitle] = useState('')

  useEffect(() => {
    console.log(user)
    if (loading) return
    if (!user) return navigate('../login')
    axios.post('/MyBooks', {
      currUID: user.uid
    })
      .then(response => {
        setR(false)
        console.log(response)
        setBookData(response.data)
        console.log(BookData)
      })
      .catch(error => console.error('Error: ', error))
  }, [user, loading, navigate, r])

  // add new book

  const handleSubmit = event => {
    console.log('submit done')
    event.preventDefault()
    event.target.reset()
  }

  const handleChange = event => {
    setTitle(event.target.value)
  }

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
  return <>
    <div>
    {
    // printing all books
    (typeof BookData[0] === 'undefined')
      ? (
      <p>You have no book!</p>
        )
      : (
          BookData.map((book, i) => (
            <div key={i}>
            <p> {book.title} </p>

            <form onSubmit={handleSubmit}>
            <label>Enter new book title:
              <input
                type="text"
                value={title.value}
                onChange={(handleChange)}
              />
              <button onClick={() => { editBook(book, title) }}>
                Update title
              </button>
            </label>
            </form>
            <button onClick={() => { deleteBook(book.bookID) }}>
              Delete
            </button>
            </div>
          ))
        )
    }
    {
      <form onSubmit={handleSubmit}>
      <label>Enter book title:
        <input
          type="text"
          value={title.value}
          onChange={(handleChange)}
        />
        <button onClick={() => { addNewBook(title) }}>
          Add new book
        </button>
      </label>
      </form>
    }
  </div>
  {loginOut(user)}
  </>
}
