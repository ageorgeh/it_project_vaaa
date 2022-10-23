/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase-setup'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { ProgressBar } from 'react-loader-spinner'

export default function DeleteShelfModal ({ visible, onClose, shelfID }) {
  const url = process.env.REACT_APP_API_URL
  // this prevents the modal , when clicked, automatically closes
  const handleOnClose = (e) => {
    if (e.target.id === 'deleteModalContainer' || e.target.id === 'buttonID') onClose()
  }

  const [r, setR] = useState(false) // Refresh state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [waiting, setWatiting] = useState(false)

  if (!visible) return null

  const deleteBook = async (data) => {
    setR(true)
    setWatiting(true)
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
          setWatiting(false)
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
        className="fixed inset-0 bg-bgDark bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className ="bg-bgLight p-5 rounded z-50">
                <p className="text-center mb-5">Are you sure you want to delete this shelf?</p>
                <NavLink to ="/mybooks">
                <div className="mb-6">
                  <div style={waiting ? { } : { display: 'none' }}><ProgressBar barColor="#147014" borderColor="#8c8c8b" height="100" width="100"/></div>
                </div>
                <button onClick={deleteBook} type="submit" className="ml-10 text-white bg-buttonNeutral hover:bg-buttonNeutral Hover font-medium rounded-lg text-sm w-full text-font sm:w-auto px-5 py-2.5 text-center">Yes</button>
                </NavLink>
                <button id='buttonID' type="button" onClick={onClose} className="ml-20 text-gray-100 bg-buttonDelete font-medium rounded-lg text-sm px-5 py-2.5 text-font">No</button>
            </div>

        </div>
  )
}

DeleteShelfModal.propTypes = { visible: PropTypes.bool, onClose: PropTypes.func, shelfID: PropTypes.string, shelves: PropTypes.array }
