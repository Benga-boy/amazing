const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

async function register(req, res) {
  try {
    // check if user already exists
    let user = await User.findOne({email: req.body.email})
    if (user) {
      return res.status(400).json({errors: [{msg: 'User already exists'}]})
    }
    // Create the user
    user = new User(req.body)
    await user.save()
    res.status(201).json({message: `Welcome ${user.name}`})
  } catch (err) {
    res.status(422).json(err.message)
  }
}

async function login(req, res) {
  try {
    // confirm user exists by searching via email
    const user = await User.findOne({email: req.body.email})
    // If user does not exist or password does not match. Throw error
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error('No user details found')
    }
    // If above passes, make the user a token
    const token = jwt.sign({sub: user._id}, secret, {expiresIn: '2 days'})
    // Send the users token in response
    res.status(202).json({
      message: `Welcome back ${user.name}`,
      token
    })
  } catch (err) {
    res.status(401).json({message: 'Unauthorized'})
  }
}

module.exports = {
  register,
  login
}