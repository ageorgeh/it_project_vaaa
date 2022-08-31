/* eslint-disable no-unused-vars */
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import MyBooks from './Components/MyBooks'
import Friends from './Components/Friends'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { auth } from './index'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'

function App () {
  const [user] = useAuthState(auth)
  return (
    <>
    {user ? <Navbar /> : null}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mybooks" element={<MyBooks />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/login" element={<Login />} />
    </Routes>

  </>
  )
}
export default App
