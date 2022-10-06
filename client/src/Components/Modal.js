import React from 'react'

export default function Modal({visible, onClose}) {
    // this prevents the modal , when clicked, automatically closes
    const handleOnClose = (e) => {
        if(e.target.id === 'modalContainer' || e.target.id === 'buttonID') onClose()
    }
    
    if(!visible) return null

    return (
        <div id='modalContainer'
        onClick ={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <div className ="bg-white p-5 rounded">
                <p className="text-center mb-5">UPDATE BOOKS</p>
                <form>
                <div class="mb-6">
                    <label for="bookTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book title</label>
                    <input type="text" id="bookTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harry Potter" />
                </div>
                <div class="mb-6">
                    <label for="bookAuthor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book Author</label>
                    <input type="text" id="bookAuthor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="J.K. Rowling" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                <button id='buttonID' type="button" onclick={onClose} className="ml-12 text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                </form>
            </div>

        </div>
    );
}