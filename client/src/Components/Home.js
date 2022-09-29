import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'

export default function Home () {
  const [user, loading] = useAuthState(auth)
  // error
  // const [name, setName] = useState('')
  const navigate = useNavigate()

  // const url = "https://react-test-for-it-api.herokuapp.com/get/"
  // const get  = () => {
  //   axios.get(url)
  //   .then((response) => {
  //     console.log(response)
  //   })
  // }

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

  // get all books for user
  const [BookData, setBookData] = useState([{}])

  useEffect(() => {
    console.log(user)
    axios.post('/MyBooks', {
      currUID: user.uid
    })
      .then(response => {
        console.log(response)
        setBookData(response.data)
        console.log(BookData)
      })
      .catch(error => console.error('Error: ', error))
  }, [])

  // add new book
  const [title, setTitle] = useState([{}])

  const addNewBook = (tit) => {
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
    axios.post('/MyBooks/DeleteBook', {
      bookID: id
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error: ', error))
  }

  return <>
  <h1>Home</h1>
  <div>
    {
    // printing all books
    (typeof BookData[0] === 'undefined')
      ? (
      <p>Loading...</p>
        )
      : (
          BookData.map((book, i) => (
            <div key={i}>
            <p> {book.title} </p><form>
            <label>Enter new book title:
              <input
                type="text"
                value={title.value}
                onChange={(e) => setTitle(e.target.value)}
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
      <form>
      <label>Enter book title:
        <input
          type="text"
          value={title.value}
          onChange={(e) => setTitle(e.target.value)}
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
