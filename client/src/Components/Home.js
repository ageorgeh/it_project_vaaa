import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../firebase-setup'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home () {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if (loading) return
    if (!user) return navigate('../login')
  }, [user, loading, navigate])
  const loginOut = (user) => {
    if (user) {
      return <button onClick={logout}>
          Logout
      </button>
    }
  }

  return <>
  <h1>Home</h1>
  {loginOut(user)}
  </>
}