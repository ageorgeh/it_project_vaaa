import React from 'react'
import PropTypes from 'prop-types'

function Book ({ title, author, image }) {
  console.log(title)
  return (
        <>
        <div className="relative w-1/6 h-64 place-content-center mb-1">
            <button className="h-48 w-32 flex justify-center items-center rounded-lg overflow-hidden">
                <img src="testbook.jpg" className="shrink-0 min-h-full min-w-full"alt="book cover" />
            </button>
            <div className="w-32">
                <p className="text-stone-100 text-sm break-words line-clamp-2">{title}</p>
            </div>
            <div className="w-32">
                <p className="text-stone-300 text-xs break-words line-clamp-1">{author}</p>
            </div>
        </div>
        </>
  )
}
Book.propTypes = { title: PropTypes.string, author: PropTypes.string, image: PropTypes.string }
export default Book
// {this.props.image}
