import React from 'react'
import PropTypes from 'prop-types'

function Shelf ({ onSelect, name }) {
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
        </li>
    </>
  )
}
Shelf.propTypes = { onSelect: PropTypes.func, name: PropTypes.string }
export default Shelf
