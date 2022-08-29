import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  query,
  where,
  addDoc
} from 'firebase/firestore'

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  signOut
} from 'firebase/auth'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// init firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAaeqcgpLuc8grPbbZreVXyYIWU8gfpp6k',
  authDomain: 'it-project-vaah-dev.firebaseapp.com',
  projectId: 'it-project-vaah-dev',
  storageBucket: 'it-project-vaah-dev.appspot.com',
  messagingSenderId: '412593831296',
  appId: '1:412593831296:web:b6f1db57e42cc73cfe5565'
}

const app = initializeApp(firebaseConfig)

// fetching data from firebase
const db = getFirestore(app)

// collection ref
const colRef = collection(db, 'books')

// gets a snapshot of the data in the collection at that point of time
getDocs(colRef)
  .then(snapshot => {
    const books = []
    snapshot.docs.forEach(doc => {
      // shows only the fields and no metadata in console
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })

console.log(app)
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  signInWithGoogle,
  logout
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
