import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { auth, signInWithGoogle, db, logout } from '../index'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, collection, getDocs, where } from 'firebase/firestore'
// import { getAdditionalUserInfo } from 'firebase/auth'

export default function Login () {
  const [user, loading] = useAuthState(auth)
  // error
  const [name, setName] = useState('')
  // const navigate = useNavigate()
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
  useEffect(() => {
    if (loading) return
    // if (!user) return navigate('./login');
    if (!user) return
    fetchUserName()
  }, [user, loading])

  const loginOut = (user) => {
    if (!user) {
      return <button onClick={signInWithGoogle}>
            Login with google
        </button>
    } else {
      return <button onClick={logout}>
            Logout
        </button>
    }
  }

  const userInfo = (user) => {
    if (user) {
      return <p><div>{name}</div>You can only see this if you are logged in</p>
    }
  }

  return <div>
        <h1>Login</h1>
        <view>{userInfo(user)}</view>
        <view>{loginOut(user)}</view>
        </div>
}
