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
                <button onClick={selectShelf} className="flex items-center py-2 w-full font-normal text-stone-900 rounded-lg dark:text-white hover:bg-stone-100 pl-3 dark:hover:bg-stone-700">
                {name}
                </button>
            </div>
            <button onClick={() => setShowDeleteModal(true)} className="theone place-items-center py-2 w-full pl-3 text-base font-normal text-stone-900 bg-red-700 rounded-lg dark:text-white hover:bg-red-600">
                            <div className="flex justify-center w-full">
                                <div className="w-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                        </button>
        </li>
        <DeleteShelfModal onClose={handleOnDeleteClose} visible={showDeleteModal} shelfID={shelfID} />
    </>
  )
}
Shelf.propTypes = { onSelect: PropTypes.func, name: PropTypes.string, shelfID: PropTypes.string, onDeleteClose: PropTypes.func }
export default Shelf
