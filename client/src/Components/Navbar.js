import React from 'react'
// eslint-disable-next-line no-unused-vars
import SearchBar from './Search'
import { NavLink } from 'react-router-dom'
import bookIcon from '../bookIcon.png'
export default function Navbar () {
  /* const { user } = useAuthState(auth)
  if (user) { */
  return (
        <><nav className="nav">
          <a href="/" className="my-reads">
              Mid-Reads
          </a>
          {/* import search bar! */}
          {/* <SearchBar /> */}
          <ul>
              <li>
                  {/* NavLink helps user to navigate which bar is active */}
                  <NavLink
                      to="/home"
                      className={({ isActive }) => isActive ? 'active' : ''}
                  >
                      Home
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to="/mybooks"
                      className={({ isActive }) => isActive ? 'active' : ''}
                  >
                      My Books
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to="/friends"
                      className={({ isActive }) => isActive ? 'active' : ''}
                  >
                      Friends
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to="/profile"
                      className={({ isActive }) => isActive ? 'active' : ''}
                  >
                      Profile
                  </NavLink>
              </li>
          </ul>
      </nav>
      <nav className="bg-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto">
            <a href="https://flowbite.com/" className="flex items-center">
                <img src={bookIcon} className="mr-3 h-6" alt="Flowbite Logo"></img>
                    <span className="self-center text-xl font-semibold dark:text-white">Mid-Reads</span>
            </a>
            <ul className="font-medium dark:border-gray-700">
                <li>
                    <a href="#" aria-current="page">My Books</a>
                </li>
            </ul>
            <button type="button" className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log Out</button>
        </div>
      </nav></>

  )
}
