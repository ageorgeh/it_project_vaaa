
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'
import { ProgressBar } from 'react-loader-spinner'

import { uploadImage, downloadImage, storageRef, auth, logout, uploadImg } from '../firebase-setup'

export default function Modal ({ visible, onClose, fieldValues, shelves }) {
  const [r, setR] = useState(false) // Refresh state
  const [uploading, setUploading] = useState(false) // Refresh state
  // this prevents the modal , when clicked, automatically closes
  const [image, setImage] = useState(null)

  //console.log("sada",fieldValues.title)
  const handleOnClose = (e) => {
    if (e.target.id === 'modalContainer' || e.target.id === 'buttonID') onClose()
  }

  const [checkedState, setCheckedState] = useState(
    new Array(shelves.length).fill(false)
  )

  const [total, setTotal] = useState(0)

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )

    setCheckedState(updatedCheckedState)
  }

  const [user, loading] = useAuthState(auth)

  const addNewBook = async (data) => {
    setR(true)
    await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      axios.post('/MyBooks/AddNewBook', {
        currUID: user.uid,
        title: data.title,
        author: data.author,
        image: data.image
      }, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      })
        .then(response => {
          console.log(response)
          return response
        })
        .catch(error => console.error('Error: ', error))
    }).catch(function (error) {
      console.log('Error', error)
    })
  }

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

  const updateBook = async (data) => {
    console.log("bookid modal", fieldValues.bookID)
    setR(true)
    await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      axios.post('/MyBooks/UpdateTitle', {
        currUID: user.uid,
        title: data.title,
        author: data.author,
        image: data.image,
        shelves: data.shelves,
        bookID : fieldValues.bookID
      }, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      })
        .then(response => {
          console.log(response)
          return response
        })
        .catch(error => console.error('Error: ', error))
    }).catch(function (error) {
      console.log('Error', error)
    })
  }

  if (!visible) return null

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      // setImage(URL.createObjectURL(img))
      setImage(img)
      // const downloadURL = uploadImage(img)
    }
  }

  const getChosenShelves = () => {
    const chosenShelves = ['All Books']
    for (let i = 0; i < shelves.length; i++) {
      if (checkedState[i]) {
        chosenShelves.push(shelves[i])
      }
    }
    return chosenShelves
  }

  const submitChanges = async (event) => {
    event.preventDefault()
    setUploading(true)
    // const downloadURL = await uploadImage(image)
    if (image) {
      uploadImg(image)
        .then((imgURL) => {
          console.log('Image upload finished! Pushing new marker to db')
          console.log(imgURL)
          addNewBook({ title: event.target[0].value, author: event.target[1].value, image: imgURL }).then(() => {
            console.log('Book added')
            onClose({ title: event.target[0].value, author: event.target[1].value, image: imgURL, shelves: getChosenShelves() })
            setUploading(false)
            setImage(null)
          })
        }).catch((error) => {
          console.log(error)
        }) 
    } else {
      addNewBook({ title: event.target[0].value, author: event.target[1].value }).then(() => {
        console.log('Book added')
        onClose({ title: event.target[0].value, author: event.target[1].value, shelves: getChosenShelves() })
        setUploading(false)
      })
    }

    // const response = await addNewBook({ title: event.target[0].value, author: event.target[1].value, image: downloadURL })
    // onClose({ title: event.target[0].value, author: event.target[1].value, image: downloadURL, shelves: [0, 1] })
  }

  const submitUpdate = async (event) => {
    event.preventDefault()
    setUploading(true)
    // const downloadURL = await uploadImage(image)
    if (image) {
      uploadImg(image)
        .then((imgURL) => {
          console.log('Image upload finished! Pushing new marker to db')
          console.log(imgURL)
          updateBook({ title: event.target[0].value, author: event.target[1].value, image: imgURL }).then(() => {
            console.log('Book updated')
            onClose({ title: event.target[0].value, author: event.target[1].value, image: imgURL, shelves: getChosenShelves() })
            setUploading(false)
            setImage(null)
          })
        }).catch((error) => {
          console.log(error)
        }) 
    } else {
      updateBook({ title: event.target[0].value, author: event.target[1].value, image: fieldValues.image}).then(() => {
        console.log('Book added')
        onClose({ title: event.target[0].value, author: event.target[1].value, shelves: getChosenShelves() })
        setUploading(false)
      })
    }

    // const response = await addNewBook({ title: event.target[0].value, author: event.target[1].value, image: downloadURL })
    // onClose({ title: event.target[0].value, author: event.target[1].value, image: downloadURL, shelves: [0, 1] })
  }

  return (
        <div id='modalContainer'
        onClick ={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <div className ="bg-white p-5 rounded">
                <p className="text-center mb-5">{fieldValues ? 'Update books' : 'Add book'}</p>
                <form onSubmit={fieldValues ?  submitUpdate : submitChanges}>
                <div className="mb-6">
                    <label htmlFor="bookTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book title</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.title : ''} id="bookTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" />
                </div>
                <div className="mb-6">
                    <label htmlFor="bookAuthor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book Author</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.author : ''} id="bookAuthor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Author" />
                </div>

                <div className="mb-6">
                <ul className="shelves-list">
                  {shelves.map((name, index) => {
                    return (
                      <li key={index}>
                        <div className="shelf-list-item">
                          <div className="left-section">
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={name}
                              value={name}
                              checked={checkedState[index]}
                              onChange={() => handleOnChange(index)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                          </div>

                        </div>
                      </li>
                    )
                  })}
                </ul>
                </div>

                <div className="mb-6">
                    <label htmlFor="bookAuthor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book cover</label>
                    <img className="h-48 w-32 shrink-0" src={image ? URL.createObjectURL(image) : image} />
                    <input type="file" name="myImage" onChange={onImageChange} />
                </div>

                <div className="mb-6">
                  <div style={uploading ? { } : { display: 'none' }}><ProgressBar barColor="#147014" borderColor="#8c8c8b" height="100" width="100"/></div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                <button id='buttonID' type="button" onClick={onClose} className="ml-12 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                </form>
            </div>

        </div>
  )
}

Modal.propTypes = { visible: PropTypes.bool, onClose: PropTypes.func, fieldValues: PropTypes.object, shelves: PropTypes.array }
