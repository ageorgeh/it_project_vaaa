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

  const getBooks = () => {
    axios.post('/MyBooks', {
      currUID: user.uid
    })
      .then(response => {
        console.log(response)
        setBookData(response.data)
        console.log(BookData)
      })
      .catch(error => console.error('Error: ', error))
  }

  // add new test book
  const [title, setTitle] = useState([{}])

  const addNewBook = (title) => {
    axios.post('/MyBooks/AddNewBook', {
      currUID: user.uid,
      title
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
      getBooks()
    }
    {
    // printing all books
    (typeof BookData[0] === 'undefined')
      ? (
      <p>Loading...</p>
        )
      : (
          BookData.map((book, i) => (
            <p key={i}> {book.title} </p>
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
        <button onClick={addNewBook(title)}>
          Add new book
        </button>
      </label>
      </form>
    }
  </div>
  {loginOut(user)}
  </>
}
