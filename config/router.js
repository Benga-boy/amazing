const router = require('express').Router()
const {register, login, logout, isAdmin} = require('../controllers/auth')
const user = require('../controllers/user')
const {createCat, getAllCats, getSingleCat, deleteCat, editCat} = require('../controllers/category')
const secureRoute = require('../lib/secureRoute')
const { createProd, getSingleProduct, getAllProducts, deleteProduct, editProduct } = require('../controllers/product')



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

router.route('/categories')
.get(getAllCats)

router.route('/categories/:catId')
.get(getSingleCat)
.delete( secureRoute, isAdmin, deleteCat)
.put(secureRoute, isAdmin, editCat)


// ! Products routes
router.route('/product/create')
.post(secureRoute, isAdmin, createProd)

router.route('/products')
.get(getAllProducts)

router.route('/products/:productId')
.get(getSingleProduct)
.delete(secureRoute, isAdmin, deleteProduct)
.put(secureRoute, isAdmin, editProduct)

// // ? Product param
// router.param('productId', productById)



module.exports = router