/* eslint-disable no-unused-vars */
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import MyBooks from './Components/MyBooks'
import Friends from './Components/Friends'
import Profile from './Components/Profile'
import EditBook from './Components/EditBook'
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
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mybooks" element={<MyBooks />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editbook/:bookid" element={<EditBook />} />
    </Routes>

  </>
  )
}
export default App
