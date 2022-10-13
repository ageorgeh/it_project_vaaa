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

import { signIn } from '../userAuth'

export default function Login () {
  const [user, loading] = useAuthState(auth)

  // login with email password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ready, setReady] = useState(false)
  // error
  const navigate = useNavigate()

  // This runs after every render of the page
  // It doesn't navigate the user because they are already on the user page
  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (loading) return
    // if (!user) return navigate('./login');
    if (user && ready) return navigate('../mybooks')
    // fetchUserName()
  }, [user, ready, loading, navigate])

  const renderForm = (
    <div className="form">
      <form>
        <div className="input-container">
          <input type="text" name="uname" className="inputC" placeholder="e-mail" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="password" required value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      </form>
      <div className="button-container">
        <button className='buttonC' onClick={() => signIn(email, password)}> Submit </button>
      </div>
    </div>
  )

  return <div className="login-container" data-testid = 'loginForm'>
        <div className="title-login">Mid-Reads</div>
        {renderForm}
        <GoogleButton className="google-login" onClick={() => {
          signInWithGoogle().then((response) => {
            console.log('signresponse', response)
            setReady(true)
          })
        }}></GoogleButton>
        </div>
}
