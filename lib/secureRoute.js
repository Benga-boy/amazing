const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET
const User = require('../models/User')

async function secureRoute(req, res, next) {
  try {
    // * If the correct header is not provided, deny access
    if (!req.headers.authorization) throw new Error()

    // * If the correct header is provided. Get the value
    const token = req.headers.authorization.replace('Bearer ', '')

    // * Attempt to decode the token
    const payload = await jwt.verify(token, secret)
    // * Search for the user by their id
    const user = await User.findById(payload.sub)

    if (!user) throw new Error()

    req.currentUser = user

    next()
  } catch (err) {
    res.status(401).json({message: 'Unauthorized'})
  }
}

module.exports = secureRoute