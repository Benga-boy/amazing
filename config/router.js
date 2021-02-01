const router = require('express').Router()
const auth = require('../controllers/auth')



// ! Auth routes
router.route('/register')
.post(auth.register)

router.route('/login')
.post(auth.login)

router.route('/logout')
.get(auth.logout)





module.exports = router