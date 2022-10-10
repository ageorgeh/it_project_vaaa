// const admin = require('../models/admin')
const { getAuth } = require('firebase-admin/auth')

class Middleware {
  async decodeToken (req, res, next) {
    // console.log(req)
    if (!req.headers.authorization) {
      return res.json({ message: 'No authentication header found' })
    }
    const token = req.headers.authorization.split(' ')[1]
    console.log('token', token)

    getAuth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken.uid
        console.log('good')
        return next()
      // ...
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

module.exports = new Middleware()
