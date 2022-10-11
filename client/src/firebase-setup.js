
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
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

const uploadImage = async (file) => {
  console.log(file)

  const storage = getStorage()

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  }

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
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
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
          break
        case 'storage/canceled':
        // User canceled the upload
          break

          // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
          break
      }
    },
    () => {
    // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        return downloadURL
      })
    }
  )
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

    // uploadTask.on(getStorage().TaskEvent.STATE_CHANGED,
    //   (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     console.log('Upload is ' + progress + '% done')
    //   },
    //   (error) => {
    //     console.log(error)
    //     // An error occurred so inform the caller
    //     reject(error)
    //   },
    //   async () => {
    //     const imgURL = await uploadTask.snapshot.ref.getDownloadURL()
    //     console.log('uploaded image: ' + imgURL)
    //     // this.newMarker.imgURL = imgURL

    //     // We 'awaited' the imgURL, now resolve this Promise
    //     resolve(imgURL)
    //   }
    // )
  })
}

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  uploadImage,
  uploadImg
}
