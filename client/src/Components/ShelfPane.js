/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import Shelf from './Shelf.js'
import PropTypes from 'prop-types'
import ShelfModal from './ShelfModal'

function ShelfPane ({ onSelect, shelves, onShelfChange }) {
  // const [allShelves, setAllShelves] = useState(shelves)
  const selectShelf = (shelfKey) => {
    onSelect(shelfKey)
  }
  const handleOnEditClose = (response) => {
    setShowEditModal(false)
    console.log('close edit')

    if (response !== undefined && 'name' in response) {
      shelves.push(response)
    }
    onShelfChange(shelves)
  }
  const handleOnDeleteClose = (response) => {
    // setShowEditModal(false)
    if (response !== undefined && 'delete' in response) {
      for (let i = shelves.length - 1; i >= 0; --i) {
        if (shelves[i].shelfID === response.delete) {
          shelves.splice(i, 1)
        }
      }
    }
    onShelfChange(shelves)
  }

  const [showEditModal, setShowEditModal] = useState(false)
  const shelfElems = shelves.map((shelf, index) =>
    <Shelf
        name={shelf.name}
        key={index}
        onSelect={selectShelf}
        shelfID={shelf.shelfID}
        onDeleteClose={handleOnDeleteClose}
    />
  )

  return (
    <>
        <div className="sticky top-3 flex-auto w-1/6 rounded-lg bg-stone-800 h-fit mt-2 z-1 ml-2 py-2">
            <a href="/img/echidna.jpg" className="flex items-center pl-2.5 mb-2">
                <span className="self-center text-xl ml-2 font-semibold whitespace-nowrap dark:text-white">Shelves</span>
            </a>
            <ul className="space-y-2 border-t-2 border-stone-500 pt-2">
                {shelfElems}
                <li>
                    <div className="mx-2">
                        <button onClick={() => setShowEditModal(true)} className="theone place-items-center py-2 w-full pl-3 text-base font-normal text-stone-900 bg-emerald-700 rounded-lg dark:text-white hover:bg-emerald-600">
                            <div className="flex justify-center w-full">
                                <div className="w-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <ShelfModal onClose={handleOnEditClose} visible={showEditModal} fieldValues={null} shelves={shelves} />
    </>
  )
}

ShelfPane.propTypes = { onSelect: PropTypes.func, shelves: PropTypes.array, onShelfChange: PropTypes.func }
export default ShelfPane
