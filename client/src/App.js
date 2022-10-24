/* eslint-disable no-unused-vars */
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import MyBooks from './Components/MyBooks'
import ViewBook from './Components/ViewBook'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { auth } from './firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'

function App () {
  const [user] = useAuthState(auth)
  return (
    <>
    {user ? <Navbar /> : null}
    <Routes>
      <Route path="/" element={<MyBooks />} />
      <Route path="/mybooks" element={<MyBooks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/viewbook/:bookid" element={<ViewBook />} />
    </Routes>

  </>
  )
}
export default App
