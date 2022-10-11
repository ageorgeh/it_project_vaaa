/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
// import { Oval } from 'react-loader-spinner'

function Book ({ title, author, image }) {
  // console.log(title)
  // console.log(image)
  const [loaded, setLoaded] = useState(false)
  const imageLoaded = () => {
    setLoaded(true)
  }
  return (
        <>
        <div className="relative w-1/6 h-64 place-content-center mb-1">
            <button className="h-48 w-32 flex justify-center items-center rounded-lg overflow-hidden">
                <img src={image} className="shrink-0 min-h-full min-w-full"alt="book cover" />
                {/* <div style={loaded ? { display: 'none' } : {}}><Oval height="100" width="100"/></div> */}
                {/* <img style={loaded ? {} : { display: 'none' }} src = { image } onLoad={imageLoaded} /> */}
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
