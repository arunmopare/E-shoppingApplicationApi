const express = require('express');
const router = express.Router()

const { getCatogoryById ,createCategory,getCategory,getAllCategory,updateCategory,removeCategory    } = require("../controllers/catogory")
const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//params
router.param("userId", getUserById);
router.param("categoryId", getCatogoryById);

//actual routes
//create Routes
router.post("/category/create/:userId", isSignedin, isAuthenticated, isAdmin, createCategory);

//read Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories/categoryId", getAllCategory);

//update Routes
router.put("/category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, updateCategory);

//delete Routes
router.delete("/category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, removeCategory);


module.exports = router;
