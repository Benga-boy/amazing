const router = require('express').Router()
const {register, login, logout, isAdmin} = require('../controllers/auth')
const user = require('../controllers/user')
const {createCat} = require('../controllers/category')
const secureRoute = require('../lib/secureRoute')
const { createProd } = require('../controllers/product')



// ! Auth routes
router.route('/register')
.post(register)

router.route('/login')
.post(login)

router.route('/logout')
.get(logout)


// ! Category routes
router.route('/category/create')
.post(secureRoute, isAdmin, createCat)

// ! Products routes
router.route('/product/create')
.post(secureRoute, isAdmin, createProd)



module.exports = router