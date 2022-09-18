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

  const url = "https://react-test-for-it-api.herokuapp.com/get/"
  const get  = () => {
    axios.get(url)
    .then((response) => {
      console.log(response)
    })
  }

  const [bookData, setBookData] = useState([{}]);

  useEffect(() => {
    axios.get("/api")
    .then(response => {
        console.log(response)
        setBookData(response.data)
    }
    )
    .catch(error => console.error('Error: ', error))
  })

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
  return <>
  <h1>Home</h1> 
  <div>
    {
    (typeof bookData.books === 'undefined') ? (
      <p>Loading...</p>
    ) : 
    (
      bookData.books.map((book, i) => (
        <p key={i}> {book} </p>
      ))
    )
    
    }
  </div>
  {loginOut(user)}
  </>
}
