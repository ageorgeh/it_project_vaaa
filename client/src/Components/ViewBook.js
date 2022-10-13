/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import DeleteModal from './DeleteModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase-setup'
import { RotatingLines } from 'react-loader-spinner'
import axios from 'axios'
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
  console.log(location.state)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [updatedBook, setUpdatedBook] = useState(null)

  const handleOnEditClose = (response) => {
    setShowEditModal(false)
    if (response !== undefined && 'shelves' in response) {
      setUpdatedBook(response)
    }
  }

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
            console.log('Response', response)
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
              <h1 className="text-2xl">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, erat a gravida ornare, magna leo rhoncus risus, et auctor turpis justo id elit. In faucibus, urna ut commodo tincidunt, sapien nulla rhoncus tellus, at tempus tortor nisi vitae ex. Curabitur lectus quam, lobortis in mi ut, consectetur consectetur risus. Donec venenatis ut felis vitae dignissim. Donec luctus sagittis purus, sed fermentum diam ullamcorper sit amet. Cras viverra suscipit arcu quis tincidunt. Etiam convallis non felis at sollicitudin. Quisque dictum rutrum enim, vitae tempor felis. Praesent neque tellus, finibus eu ultrices a, sagittis quis nunc. Cras vestibulum posuere purus a cursus. Fusce pulvinar fringilla libero. Integer vulputate nunc eget urna efficitur, a interdum metus laoreet. Donec sit amet ligula nisl.</h1>
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
