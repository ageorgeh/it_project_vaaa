/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase-setup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DeleteShelfModal ({ visible, onClose, shelfID }) {
  const url = process.env.REACT_APP_API_URL
  // this prevents the modal , when clicked, automatically closes
  const handleOnClose = (e) => {
    if (e.target.id === 'deleteModalContainer' || e.target.id === 'buttonID') onClose()
  }

  const [r, setR] = useState(false) // Refresh state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  if (!visible) return null

  const deleteBook = async (data) => {
    setR(true)
    await user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      axios.post(url + '/MyShelves/DeleteShelf', {
        shelfID
      }, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }
      })
        .then(response => {
          onClose({ delete: response.data })
          navigate('../MyBooks')
          return response
        })
        .catch(error => console.error('Error: ', error))
    }).catch(function (error) {
      console.log('Error', error)
    })
  }

  return (
        <div id='deleteModalContainer'
        onClick ={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10 flex justify-center items-center">
            <div className ="bg-white p-5 rounded">
                <p className="text-center mb-5">Are you sure you want to delete this shelf?</p>
                <button onClick={deleteBook} type="submit" className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes</button>
                <button id='buttonID' type="button" onClick={onClose} className="ml-20 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">No</button>
            </div>

        </div>
  )
}

DeleteShelfModal.propTypes = { visible: PropTypes.bool, onClose: PropTypes.func, shelfID: PropTypes.string, shelves: PropTypes.array }
