import React from "react";
import {
    useParams
  } from "react-router-dom";

function EditBook() {
    let {bookid} = useParams();
    console.log(typeof(bookid));
    
    return (
        <>
        <h1 className="text-white">{bookid}</h1>
        </>
        );
}

export default EditBook;
