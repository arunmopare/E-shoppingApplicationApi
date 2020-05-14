const express = require('express')
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth")

router.param("userID", getUserById);

router.get("/user/:userID", isSignedin, isAuthenticated, getUser);
router.put("/user/:userID", isSignedin, isAuthenticated, updateUser);

router.get("/orders/user/:userID", isSignedin, isAuthenticated, userPurchaseList);

module.exports = router;