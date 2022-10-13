import React from 'react'
// eslint-disable-next-line no-unused-vars
import { logout } from '../firebase-setup'
import { NavLink } from 'react-router-dom'
import bookIcon from '../bookIcon.png'
export default function Navbar () {
  /* const { user } = useAuthState(auth)
  if (user) { */
  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="flex items-center">
                <img src={bookIcon} className="mr-3 h-6" alt="Book Logo"></img>
                    <span className="self-center text-xl font-semibold dark:text-white">Mid-Reads</span>
            </a>
            <ul className="font-medium dark:border-gray-700">
                <li>
                    <NavLink to ="/mybooks"> {/* className={({ isActive }) => isActive ? 'active' : ''}> */}
                        My Books
                    </NavLink>
                </li>
            </ul>
            <button type="button" onClick={logout} className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log Out</button>
        </div>
      </nav>
    </>

  )
}
