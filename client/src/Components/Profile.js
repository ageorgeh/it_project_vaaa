/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { uploadImage, downloadImage, storageRef } from '../firebase-setup'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage'
import { Oval } from 'react-loader-spinner'

// export default function Profile () {
//   return <h1>Profile</h1>
// }

export default function Profile () {
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [downImgURL, setDownImg] = useState(null)
  const [files, setFiles] = useState(null)

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     await getDownloadURL(storageRef).then((url) => {
  //       setDownImg(url)
  //     })
  //   }
  //   fetchImages()
  // }, [])

  useEffect(() => {
    const fetchImages = async () => {
      const result = await listAll(storageRef)
      const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef))

      return Promise.all(urlPromises)
    }

    const loadImages = async () => {
      const urls = await fetchImages()
      setDownImg(urls[0])
      setFiles(urls)
    }
    loadImages()
  }, [])

  // if we are using arrow function binding is not required
  //  this.onImageChange = this.onImageChange.bind(this);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      setImage(URL.createObjectURL(img))
      uploadImage(img)
    }
  }

  const imageLoaded = () => {
    setLoaded(true)
  }

  if (downImgURL != null) {
    return (
        <div>
          <div>
            <div>
              <img src={image} />
              <h1>Select Image</h1>
              <input type="file" name="myImage" onChange={onImageChange} />
              <h2>Downloaded image:</h2>
              <div style={loaded ? { display: 'none' } : {}}><Oval height="100" width="100"/></div>
              <img style={loaded ? {} : { display: 'none' }} src = { downImgURL } onLoad={imageLoaded} />
            </div>
          </div>
        </div>
    )
  } else {
    return (<div>Loading...</div>)
  }
}
