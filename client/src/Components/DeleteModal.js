import React from 'react'

export default function DeleteModal({visible, onClose}) {
    // this prevents the modal , when clicked, automatically closes
    const handleOnClose = (e) => {
        if(e.target.id === 'deleteModalContainer' || e.target.id === 'buttonID') onClose()
    }
    
    if(!visible) return null

    return (
        <div id='deleteModalContainer'
        onClick ={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <div className ="bg-white p-5 rounded">
                <p className="text-center mb-5">Are you sure you want to delete this book?</p>
                <button type="submit" className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes</button>
                <button id='buttonID' type="button" onclick={onClose} className="ml-20 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">No</button>
            </div>

        </div>
    );
}