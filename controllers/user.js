const User = require('../models/User')

async function currentUser(req, res) {
  req.body.user = req.currentUser
  console.log(req.body.user)
  res.status(200).json({user: req.body.user, msg: 'Hey!!'})
}

module.exports = {
  currentUser
}