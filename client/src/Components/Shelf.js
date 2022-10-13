/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DeleteShelfModal from './DeleteShelfModal'
import PropTypes from 'prop-types'

function Shelf ({ onSelect, name, shelfID, onDeleteClose }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleOnDeleteClose = (response) => {
    onDeleteClose(response)
    setShowDeleteModal(false)
  }
  const selectShelf = () => {
    onSelect(name)
  }

  return (
    <>
        <li>
            <div className="mx-2">
                <button onClick={selectShelf} className="place-items-left py-2 font-normal pr-3 text-stone-900 rounded-lg dark:text-white hover:bg-stone-100 pl-3 dark:hover:bg-stone-700">
                {name}
                </button>
                {name === 'All Books'
                  ? null
                  : <button onClick={() => setShowDeleteModal(true)} className="place-items-right py-2 overflow-visible pl-3 bg-red-700 rounded-lg dark:text-white hover:bg-red-600">
                            <div className="flex">
                                <div className="w-6">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="6 0 24 24" fill="currentColor" className="overflow-visible">
                                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>

                                </div>
                            </div>

                        </button>}
            </div>
        </li>
        {name === 'All Books' ? null : <DeleteShelfModal onClose={handleOnDeleteClose} visible={showDeleteModal} shelfID={shelfID} />}
    </>
  )
}
Shelf.propTypes = { onSelect: PropTypes.func, name: PropTypes.string, shelfID: PropTypes.string, onDeleteClose: PropTypes.func }
export default Shelf
