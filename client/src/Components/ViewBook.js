/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import DeleteModal from './DeleteModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase-setup'
import { RotatingLines } from 'react-loader-spinner'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'

import {
  useNavigate,
  useParams, useLocation
} from 'react-router-dom'

// Sand Dollar : #E4D4C8
// Tan : #D0B49F
// Brown : #A47551
// Carafe : $523A28
function ViewBook () {
  const url = process.env.NODE_ENV === 'production' ? 'https://it-project-vaaah-dev-api.herokuapp.com' : ''
  const { bookid } = useParams()
  // console.log(typeof(bookid));
  const location = useLocation()
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)
  const { shelves } = location.state
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [updatedBook, setUpdatedBook] = useState(null)

  const handleOnEditClose = (response) => {
    setShowEditModal(false)
    if (response !== undefined && 'shelves' in response) {
      setUpdatedBook(response)
    }
  }

  useEffect(() => {
  }, [updatedBook])

  const handleOnDeleteClose = () => setShowDeleteModal(false)

  const [r, setR] = useState(false)
  const [BookData, setBookData] = useState(null)

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
    const fetch = async () => {
      await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        axios.post(url + '/MyBooks/GetFromBookID', {
          currUID: user.uid,
          bookID: bookid
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
      }).catch(function (error) {
        console.log('Error', error)
      })
    }
    const addBooksToList = async () => {
      await fetch()
    }
    addBooksToList()
  }, [user, loading, navigate, r])

  const val = 0
  if (!BookData) {
    return (<div ><RotatingLines height="100" width="100"/></div>)
  } else {
    return (
          <>

          <div className="flex flex-col m-auto mt-10 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100">
              <img className="object-fill w-full h-full rounded-lg md:h-full md:w-60 md:rounded-none md:rounded-lg" src={updatedBook ? updatedBook.image : BookData.image} alt="" />
              <div className="flex flex-col justify-between p-10 leading-relaxed">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{updatedBook ? updatedBook.title : BookData.title}</h5>
                  <p className="mb-3 font-normal text-gray-700">by {updatedBook ? updatedBook.author : BookData.author}</p>
                  <Rating
                    initialValue={updatedBook ? updatedBook.rating : BookData.rating}
                    readonly={true}
                    size={40}
                    transition
                    fillColor='orange'
                    emptyColor='gray'
                    allowFraction={true}
                  />
                  <p className="mb-4 font-sm text-gray-700"> {updatedBook ? updatedBook.description : BookData.description}</p>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(true)}
                    className="mb-2 text-[#523A28] bg-[#D0B49F] font-medium rounded-lg text-sm px-5 py-2.5" id="open-edit">Edit</button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">Delete</button>
                  <Modal onClose={handleOnEditClose} visible={showEditModal} fieldValues={updatedBook || BookData} shelves={shelves}/>
                  <DeleteModal onClose={handleOnDeleteClose} visible={showDeleteModal} bookID={bookid}/>
              </div>
          </div>

          </>

    )
  }
}

export default ViewBook
