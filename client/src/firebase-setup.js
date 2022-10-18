/* eslint-disable no-unused-vars */

import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import axios from 'axios'

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

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const url = process.env.REACT_APP_API_URL
const signInWithGoogle = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
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
  }
  )
}

// Logs the user out
const logout = () => {
  signOut(auth)
}

const uploadImg = async (file) => {
  console.log(file)
  // Return a promise that will either resolve or emit an error
  return new Promise((resolve, reject) => {
    console.log('f', file)
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    }
    console.log('Uploading image ...')

    const storage = getStorage()
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on('state_changed',
      (snapshot) => {
        console.log('snapshot', snapshot)
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log(error)
        reject(error)
      },
      async () => {
        console.log('snap', uploadTask.snapshot)
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      })
  })
}

export {
  auth,
  signInWithGoogle,
  logout,
  uploadImg
}
