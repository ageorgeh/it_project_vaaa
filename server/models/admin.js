/* eslint-disable no-unused-vars */
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

console.log(process.env.NODE_ENV)

let serviceAccount

if (process.env.NODE_ENV === 'production') {
  serviceAccount = require('./creds-prod.json')
} else {
  serviceAccount = require('./creds.json')
}

initializeApp({
  // eslint-disable-next-line no-undef
  credential: cert(serviceAccount)
})

const db = getFirestore()

module.exports = { db }
