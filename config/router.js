const router = require("express").Router();
const { register, login, logout, isAdmin } = require("../controllers/auth");
const { getUser, userUpdate } = require("../controllers/user");
const {
  createCat,
  getAllCats,
  getSingleCat,
  deleteCat,
  editCat,
} = require("../controllers/category");
const secureRoute = require("../lib/secureRoute");
const {
  createProd,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  relatedProducts,
  getProdCats,
  listProdBySearch,
  getPicture,
} = require("../controllers/product");

// ! Auth routes
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

// ! Category routes
router.route("/category/create").post(secureRoute, isAdmin, createCat);

router.route("/categories").get(getAllCats);

router
  .route("/categories/:catId")
  .get(getSingleCat)
  .delete(secureRoute, isAdmin, deleteCat)
  .put(secureRoute, isAdmin, editCat);

// ! Products routes
router.route("/products").get(getAllProducts);

router.route("/products/categories").get(getProdCats);

router.route("/products/by/search").post(listProdBySearch);

router.route("/product/create").post(secureRoute, isAdmin, createProd);

router.route("/product/picture/:productId").get(getPicture);

router
  .route("/products/:productId")
  .get(getSingleProduct)
  .delete(secureRoute, isAdmin, deleteProduct)
  .put(secureRoute, isAdmin, editProduct);

router.route("/products/related/:productId").get(relatedProducts);
// // ? Product param
// router.param('productId', productById)

// ! USER
router
  .route("/user/:id")
  .get(secureRoute, getUser)
  .put(secureRoute, userUpdate);

module.exports = router;
