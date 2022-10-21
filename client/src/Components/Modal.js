
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'
import { ProgressBar } from 'react-loader-spinner'
import { Rating } from 'react-simple-star-rating'

import { uploadImage, downloadImage, storageRef, auth, logout, uploadImg } from '../firebase-setup'

const MODAL_STYLES = {
  position: 'absolute',
  zIndex: '1000',
  width: '35%',
  height: '90%',
  borderRadius: '.5em'
}
const OVERLAY_STYLE = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0, .8)',
  zIndex: '1000',
  overflowY: 'auto'
}

export default function Modal ({ visible, onClose, fieldValues, shelves }) {
  const url = process.env.NODE_ENV === 'production' ? 'https://it-project-vaaah-dev-api.herokuapp.com' : ''

  useEffect(() => {
    setCheckedState(fieldValues ? getChecked() : new Array(shelves.length).fill(false))
  }, [shelves])

  const getShelfNames = (shelfResponse) => {
    const shelves = []
    shelfResponse.forEach((shelf) => {
      shelves.push(shelf.name)
    })
    return shelves
  }

  const [r, setR] = useState(false) // Refresh state
  const [uploading, setUploading] = useState(false) // Refresh state
  // this prevents the modal , when clicked, automatically closes
  const [image, setImage] = useState(null)

  // console.log("sada",fieldValues.title)
  const handleOnClose = (e) => {
    if (e.target.id === 'modalContainer' || e.target.id === 'buttonID') onClose()
  }

  const getChecked = () => {
    const checked = []
    for (let i = 0; i < shelves.length; i++) {
      if (fieldValues.shelves.includes(shelves[i].name)) {
        checked.push(true)
      } else {
        checked.push(false)
      }
    }
    return checked
  }

  const [checkedState, setCheckedState] = useState(
    fieldValues ? getChecked() : new Array(shelves.length).fill(false)
  )

  const [rating, setRating] = useState(fieldValues ? fieldValues.rating : 0)

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const [user, loading] = useAuthState(auth)

  const addNewBook = async (data) => {
    return new Promise((resolve, reject) => {
      setR(true)
      user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        axios.post(url + '/MyBooks/AddNewBook', {
          currUID: user.uid,
          title: data.title,
          author: data.author,
          image: data.image,
          shelves: data.shelves,
          rating: data.rating,
          description: data.description
        }, {
          headers: {
            Authorization: 'Bearer ' + idToken
          }
        })
          .then(async (response) => {
            resolve(response)
          })
          .catch(error => console.error('Error: ', error))
      }).catch(function (error) {
        console.log('Error', error)
      })
    })
  }

  const updateBook = async (data) => {
    setR(true)
    await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      axios.post(url + '/MyBooks/UpdateTitle', {
        currUID: user.uid,
        title: data.title,
        author: data.author,
        image: data.image,
        shelves: data.shelves,
        bookID: fieldValues.bookID,
        rating: data.rating,
        description: data.description
      }, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      })
        .then(response => {
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
        chosenShelves.push(shelves[i].name)
      }
    }
    return Array.from(new Set(chosenShelves))
  }

  const submitChanges = async (event) => {
    event.preventDefault()
    setUploading(true)
    // const downloadURL = await uploadImage(image)
    if (image) {
      uploadImg(image)
        .then(async (imgURL) => {
          console.log('Image upload finished! Pushing new marker to db')
          console.log(imgURL)
          addNewBook({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, image: imgURL, shelves: getChosenShelves(), rating }).then(async (response) => {
            console.log('Book added')
            console.log(response)
            onClose({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, image: imgURL, shelves: getChosenShelves(), bookID: response.data, rating })
            setUploading(false)
            setImage(null)
          })
        }).catch((error) => {
          console.log(error)
        })
    } else {
      addNewBook({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, shelves: getChosenShelves(), rating }).then((response) => {
        console.log('Book added')
        console.log(response)
        console.log(getChosenShelves())
        onClose({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, shelves: getChosenShelves(), bookID: response.data, rating })
        setUploading(false)
      })
    }
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
          updateBook({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, image: imgURL, shelves: getChosenShelves(), rating }).then(() => {
            console.log('Book updated')
            onClose({ title: event.target[0].value, author: event.target[1].value, description: event.target[2].value, image: imgURL, shelves: getChosenShelves(), bookID: fieldValues.bookID, rating })
            setUploading(false)
            setImage(null)
          })
        }).catch((error) => {
          console.log(error)
        })
    } else {
      const book = {
        title: event.target[0].value,
        author: event.target[1].value,
        description: event.target[2].value,
        image: fieldValues.image,
        shelves: getChosenShelves(),
        bookID: fieldValues.bookID,
        rating
      }
      updateBook(book).then(() => {
        console.log('Book updated')
        onClose(book)
        setUploading(false)
      })
    }

    // const response = await addNewBook({ title: event.target[0].value, author: event.target[1].value, image: downloadURL })
    // onClose({ title: event.target[0].value, author: event.target[1].value, image: downloadURL, shelves: [0, 1] })
  }

  return (
        <div id='modalContainer'
        style={OVERLAY_STYLE}
        onClick ={handleOnClose}
        className="fixed inset-0 bg-bgDark bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <div className ="bg-bgLighter p-5 rounded fixed overflow-auto" style={MODAL_STYLES}>
                <form onSubmit={fieldValues ? submitUpdate : submitChanges}>
                <div className="h-8">
                <p className="text-center mb-5">{fieldValues ? 'Update books' : 'Add book'}</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="bookTitle" className="block mb-2 text-sm font-medium text-fontDark">Book title</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.title : ''} id="bookTitle" className="bg-bgMed border border-bgLight text-font text-sm rounded-lg block w-full p-2.5 placeholder:text-bgLight" placeholder="Title" />
                </div>
                <div className="mb-6">
                    <label htmlFor="bookAuthor" className="block mb-2 text-sm font-medium text-fontDark">Book Author</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.author : ''} id="bookAuthor" className="bg-bgMed border border-bgLight text-font text-sm rounded-lg block w-full p-2.5 placeholder:text-bgLight" placeholder="Author" />
                </div>

                <div className="mb-6">
                    <label htmlFor="bookDescription" className="block mb-2 text-sm font-medium text-fontDark">Book Description</label>
                    <input type="text" defaultValue={fieldValues ? fieldValues.description : ''} id="bookDescription" className="bg-bgMed border border-bgLight text-font text-sm rounded-lg block w-full p-2.5 placeholder:text-bgLight" placeholder="Description" />
                </div>

                <div className="mb-6">
                    <label htmlFor="bookRating" className="block mb-2 text-sm font-medium text-fontDark">Book Rating</label>
                    <Rating
                      initialValue={fieldValues ? fieldValues.rating : ''}
                      size={40}
                      transition
                      fillColor='orange'
                      emptyColor='gray'
                      onClick={(rating) => { setRating(rating) } }
                      allowFraction={true}
                    />
                </div>

                <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-fontDark">Shelves</label>
                <ul className="shelves-list w-48 text-sm font-medium text-fontDark bg-bgLight rounded-lg border border-font">
                  {getShelfNames(shelves).map((name, index) => {
                    if (name !== 'All Books') {
                      return (
                      <li key={index} className="w-full border-b border-font">
                          <div className="flex items-center pl-3">
                            <input
                              className="w-4 h-4 text-bgDark bg-bgLight rounded border-font accent-buttonNeutral"
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={name}
                              value={name}
                              checked={checkedState[index]}
                              onChange={() => handleOnChange(index)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`} className="py-3 ml-2 w-full text-sm font-medium text-fontDark">{name}</label>
                          </div>
                      </li>
                      )
                    } else {
                      return null
                    }
                  })}
                </ul>
                </div>

                <div className="mb-6">
                    <label htmlFor="bookAuthor" className="block mb-2 text-sm font-medium text-fontDark">Book cover</label>
                    <img className="h-48 w-32 shrink-0" src={image ? URL.createObjectURL(image) : image} />
                    <input type="file" name="myImage" onChange={onImageChange} className="block w-full mt-2 text-sm text-fontDark
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:font file:text-font
                      file:bg-buttonNeutral
                      hover:file:bg-buttonNeutralHover"/>
                </div>

                <div className="mb-6">
                  <div style={uploading ? { } : { display: 'none' }}><ProgressBar barColor="#147014" borderColor="#8c8c8b" height="100" width="100"/></div>
                </div>

                <button type="submit" className="text-font bg-buttonNeutral hover:bg-buttonNeutralHover font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{fieldValues ? 'Update' : 'Add'}</button>
                <button id='buttonID' type="button" onClick={onClose} className="ml-12 text-font bg-buttonDelete hover:bg-buttonDeleteHover font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                </form>
            </div>

        </div>
  )
}

Modal.propTypes = { visible: PropTypes.bool, onClose: PropTypes.func, fieldValues: PropTypes.object, shelves: PropTypes.array }
