import React from 'react'
import {
  useParams
} from 'react-router-dom'

function EditBook () {
  const { bookid } = useParams()

  return (
        <>
        <h1 className="text-white">{bookid}</h1>
        </>
  )
}

export default EditBook
