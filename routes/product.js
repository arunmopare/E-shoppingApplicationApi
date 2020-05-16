const express = require('express');
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, removeProduct, updateProduct } = require("../controllers/product");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all params
router.param("userId", getUserById);;
router.param("prductId", getProductById);

//all actual params
router.post("/product/create/:userId", isSignedin, isAuthenticated, isAdmin, createProduct);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, removeProduct);

//update route
router.put("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, updateProduct);

//listing page (feturing products)
module.exports = router;