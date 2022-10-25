import React from 'react'
// eslint-disable-next-line no-unused-vars
import { logout } from '../firebase-setup'
import bookIcon from '../bookIcon.png'
export default function Navbar () {
  /* const { user } = useAuthState(auth)
  if (user) { */
  return (
    <>
      <nav className="bg-bgLighter px-2 sm:px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="flex items-center">
                <img src={bookIcon} className="mr-3 h-6" alt="Book Logo"></img>
                    <span className="self-center text-xl font-semibold">MidReads</span>
            </a>
            <button type="button" onClick={logout} className="text-font bg-bgDark hover:bg-bgHover font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log Out</button>
        </div>
      </nav>
    </>

  )
}
