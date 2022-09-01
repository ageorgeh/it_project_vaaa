import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../index'
// signInWithEmailAndPassword
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home () {
  const [user, loading] = useAuthState(auth)
  // error
  // const [name, setName] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) return
    if (!user) return navigate('../login')
  }, [user, loading])

  const loginOut = (user) => {
    if (user) {
      return <button onClick={logout}>
          Logout
      </button>
    }
  }
  return <>
  <h1>Home</h1>
  <view>{loginOut(user)}</view>
  </>
}
