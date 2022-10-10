import { auth } from './firebase-setup'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const signUp = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export {
  signIn,
  signUp
}
