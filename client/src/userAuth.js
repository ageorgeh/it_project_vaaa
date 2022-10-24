import { auth } from './firebase-setup'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import axios from 'axios'

const url = process.env.REACT_APP_API_URL
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const signUp = async (email, password) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user
      user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        axios.post(url + '/SetupNewGoogleUser', {
          user
        },
        {
          headers: {
            Authorization: 'Bearer ' + idToken
          }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => console.error('Error: ', error))
      }).catch(function (error) {
        console.log('Error', error)
      })
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  })
}

export {
  signIn,
  signUp
}
