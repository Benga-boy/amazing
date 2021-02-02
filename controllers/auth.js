const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET


// * create a user
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

// * Log user in
async function login(req, res) {
  try {
    // confirm user exists by searching via email
    const user = await User.findOne({email: req.body.email})
    // If user does not exist or password does not match. Throw error
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error('No user details found')
    }
    // If above passes, make the user a token
    const token = jwt.sign({sub: user._id}, secret)
    res.cookie('t', token, {expiresIn: '2 days'})
    // Send the users token in response
    const {_id, name, email, role} = user
    res.status(202).json({
      message: `Welcome back ${user.name}`,
      user: {_id, name, email, role},
      token
    })
  } catch (err) {
    res.status(401).json({message: 'Unauthorized'})
  }
}


// * Sign user out
async function logout(req, res) {
  res.clearCookie('t')
  res.json
  ({message: 'Logout successful'})
}


//* Admin user middleare
async function isAdmin(req, res, next) {
  if (req.currentUser.role === 0) {
    return res.status(401).json({error: 'Admin resource! Access denied'})
  }

  next()
}

module.exports = {
  register,
  login,
  logout,
  isAdmin,
}