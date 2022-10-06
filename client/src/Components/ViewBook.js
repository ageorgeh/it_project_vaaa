import React, { useState } from "react";
import Modal from "./Modal";
import {
    useParams
  } from "react-router-dom";
//Sand Dollar : #E4D4C8
// Tan : #D0B49F
// Brown : #A47551
// Carafe : $523A28
function EditBook() {
    let {bookid} = useParams();
    //console.log(typeof(bookid));
    const [showModal, setShowModal] = useState(false)

    const handleOnClose = () => setShowModal(false)
    return (
        <>
        
        {/* the buttons only shows when the parent div is hovered*/}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-white bg-blue-100">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="text-black"> PICTURE HERE (left)</h1>
            <br></br>
            <br></br>
          </div>
          <div className="bg-[#E4D4C8] text-[#523A28]">
            <h1 className="text-2xl">Title : {bookid}</h1>
            <h1 className="text-2xl">Author:  </h1>
            <h1 className="text-2xl">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, erat a gravida ornare, magna leo rhoncus risus, et auctor turpis justo id elit. In faucibus, urna ut commodo tincidunt, sapien nulla rhoncus tellus, at tempus tortor nisi vitae ex. Curabitur lectus quam, lobortis in mi ut, consectetur consectetur risus. Donec venenatis ut felis vitae dignissim. Donec luctus sagittis purus, sed fermentum diam ullamcorper sit amet. Cras viverra suscipit arcu quis tincidunt. Etiam convallis non felis at sollicitudin. Quisque dictum rutrum enim, vitae tempor felis. Praesent neque tellus, finibus eu ultrices a, sagittis quis nunc. Cras vestibulum posuere purus a cursus. Fusce pulvinar fringilla libero. Integer vulputate nunc eget urna efficitur, a interdum metus laoreet. Donec sit amet ligula nisl.</h1>
            <button 
              type="button"
              onClick={() => setShowModal(true)} 
              className="mb-10 text-[#523A28] bg-[#D0B49F] font-medium rounded-lg text-sm px-5 py-2.5 m-2" id="open-edit">Edit</button>
            <button type="button" className="mt-20 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Delete</button>
          </div>
        </div>  
        <Modal onClose={handleOnClose} visible={showModal} />
        </>
        );
}

export default EditBook;
