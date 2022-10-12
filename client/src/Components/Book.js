/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
// import { Oval } from 'react-loader-spinner'

function Book ({ title, author, image, bookID, shelves, book }) {
  // console.log(title)
  // console.log(image)
  const [loaded, setLoaded] = useState(false)
  const imageLoaded = () => {
    setLoaded(true)
  }
  return (
        <>
        <div className="relative h-64 place-content-center mb-1 px-3">
            <button className="h-48 w-32 flex justify-center items-center rounded-lg overflow-hidden">
                <Link to = {`/viewbook/${bookID}`} state = {{shelves:shelves , book}}  >
                  <img src={image} className="shrink-0 min-h-full min-w-full" alt="book cover" />
                </Link>
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
Book.propTypes = { title: PropTypes.string, author: PropTypes.string, image: PropTypes.string, bookID : PropTypes.string, shelves: PropTypes.array, book: PropTypes.object }
export default Book
// {this.props.image}
