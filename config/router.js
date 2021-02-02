const router = require('express').Router()
const auth = require('../controllers/auth')
const user = require('../controllers/user')
const secureRoute = require('../lib/secureRoute')



// ! Auth routes
router.route('/register')
.post(auth.register)

router.route('/login')
.post(auth.login)

router.route('/logout')
.get(auth.logout)

router.route('/hello')
.get(secureRoute, user.currentUser)






module.exports = router