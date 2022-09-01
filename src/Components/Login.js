import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { auth, signInWithGoogle, db, logout } from '../index'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, collection, getDocs, where } from 'firebase/firestore'
// import { getAdditionalUserInfo } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'

export default function Login () {
  const [user, loading] = useAuthState(auth)
  // error
  const [name, setName] = useState('')
  // const navigate = useNavigate()

  // This function sets the name state to the name of the user.
  // It will throw an error if the user is not logged in
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setName(data.name)
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }
  // This runs after every render of the page
  // It doesn't navigate the user because they are already on the user page
  useEffect(() => {
    if (loading) return
    // if (!user) return navigate('./login');
    if (!user) return
    fetchUserName()
  }, [user, loading])

  // Returns different jsx depending on if the user is logged in
  const loginOut = (user) => {
    if (!user) {
      return <GoogleButton className="google-login" onClick={signInWithGoogle}></GoogleButton>
    } else {
      return <button onClick={logout}>
            Logout
        </button>
    }
  }

  // Show info only if the user is logged in
  // eslint-disable-next-line no-unused-vars
  const userInfo = (user) => {
    if (user) {
      return <p><div>{name}</div>You can only see this if you are logged in</p>
    }
  }

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
        {/* only render the login container when the user is not logged in */}
        {user ? navigate('/home') : renderForm}
        <view>{loginOut(user)}</view>
        </div>
}
