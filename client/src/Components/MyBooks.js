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
import { RotatingLines } from 'react-loader-spinner'

function MyBooks () {
  const url = process.env.NODE_ENV === 'production' ? 'https://it-project-vaaah-dev-api.herokuapp.com' : ''
  // renavigate user to login if not logged in
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
  }, [user, loading, navigate])

  const [BookData, setBookData] = useState(null) // Array of book objects sent from API
  const [shelfData, setShelfData] = useState(null) // Array of shelf objects sent from API
  const [r, setR] = useState(false) // Refresh state
  const [title, setTitle] = useState('') // Used for update title form
  const [books, setBooks] = useState([{}]) // Books array in format with mybooks page

  const getShelves = (shelfResponse) => {
    const shelves = []
    shelfResponse.forEach((shelf) => {
      shelves.push(shelf)
    })
    shelves.sort((x, y) => { return x.name === 'All Books' ? -1 : y.name === 'All Books' ? 1 : 0 })
    return shelves
  }

  // getting all books and storing
  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
    const fetch = async () => {
      await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        axios.post(url + '/MyBooks', {
          currUID: user.uid
        },
        {
          headers: {
            Authorization: 'Bearer ' + idToken
          }
        })
          .then(response => {
            setR(false)
            setBookData(response.data)
          })
          .catch(error => console.error('Error: ', error))

        axios.post(url + '/MyShelves', {
          currUID: user.uid
        },
        {
          headers: {
            Authorization: 'Bearer ' + idToken
          }
        })
          .then(response => {
            setR(false)
            setShelfData(getShelves(response.data))
          })
          .catch(error => console.error('Error: ', error))
      }).catch(function (error) {
        console.log('Error', error)
      })
    }
    const addBooksToList = async () => {
      await fetch()
    }
    addBooksToList()
  }, [user, loading, navigate, r])

  const onShelfChange = (response) => {
    setShelfData(response)
  }

  const [currShelf, setCurrShelf] = useState('All Books')
  const [currShelfName, setCurrShelfName] = useState({})

  const selectShelf = (shelfKey) => {
    setCurrShelf(shelfKey)
    setCurrShelfName(shelfKey)
    // setCurrShelfName(shelves[shelfKey])
  }

  // eslint-disable-next-line no-constant-condition
  if (BookData === null || shelfData === null) {
    return (<div ><RotatingLines height="100" width="100"/></div>)
  } else {
    return (
    <>
      <div className="flex relative bg-stone-900">
          <ShelfPane onSelect={selectShelf} shelves={getShelves(shelfData)} onShelfChange={onShelfChange} />
          <BookPane
            shelves={shelfData}
            currShelf={currShelf}
            currShelfName={currShelf}
            books={BookData}
            />
      </div>
    </>
    )
  }
}
export default MyBooks
