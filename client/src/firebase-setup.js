
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

const books = []

// get an array of all the documents in the collection 'books'
getDocs(colRef)
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
  })
  .catch(err => {
    console.log(err.message)
  })

// console.log(books)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

// A function to sign in with a google popup
// Also adds the user information to the firestore DB if they don't already exist
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

// Logs the user out
const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  signInWithGoogle,
  logout
}
