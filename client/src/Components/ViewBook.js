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

          {/* the buttons only shows when the parent div is hovered */}
          <div className="grid grid-cols-2 gap-2">
            <img src={updatedBook ? updatedBook.image : BookData.image} className="object-contain w-full h-screen" />
            <div className="bg-[#E4D4C8] text-[#523A28]">
              <h1 className="text-2xl">Title : {updatedBook ? updatedBook.title : BookData.title}</h1>
              <h1 className="text-2xl">Author:  {updatedBook ? updatedBook.author : BookData.author} </h1>
              <Rating
                initialValue={updatedBook ? updatedBook.rating : BookData.rating}
                readonly={true}
                size={40}
                transition
                fillColor='orange'
                emptyColor='gray'
                allowFraction={true}
              />
              <h1 className="text-2xl">Description: {updatedBook ? updatedBook.description : BookData.description}</h1>
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="mb-10 text-[#523A28] bg-[#D0B49F] font-medium rounded-lg text-sm px-5 py-2.5 m-2" id="open-edit">Edit</button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="mt-20 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Delete</button>
            </div>
          </div>
          <Modal onClose={handleOnEditClose} visible={showEditModal} fieldValues={updatedBook || BookData} shelves={shelves}/>
          <DeleteModal onClose={handleOnDeleteClose} visible={showDeleteModal} bookID={bookid}/>
          </>

    )
  }
}

export default ViewBook
