/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { auth, signInWithGoogle, db, logout } from '../firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, collection, getDocs, where } from 'firebase/firestore'
// import { getAdditionalUserInfo } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'

export default function Login () {
  const [user, loading] = useAuthState(auth)
  // error
  // const navigate = useNavigate()

  // This runs after every render of the page
  // It doesn't navigate the user because they are already on the user page
  useEffect(() => {
    if (loading) return
    // if (!user) return navigate('./login');
    if (user) return navigate('../home')
    // fetchUserName()
  }, [user, loading])

  const renderForm = (
    <div className="form">
      <form>
        <div className="input-container">
          <input type="text" name="uname" className="inputC" placeholder="e-mail" required />
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="password" required />
        </div>
        <div className="button-container">
          <input type="submit" className='buttonC' />
        </div>
      </form>
    </div>
  )
  const navigate = useNavigate()

  return <div className="login-container">
        <div className="title-login">Mid-Reads</div>
        {renderForm}
        <GoogleButton className="google-login" onClick={signInWithGoogle}></GoogleButton>
        </div>
}