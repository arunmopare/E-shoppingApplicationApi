const express = require('express')
const router = express.Router()

const { getUserById, getUser } = require("../controllers/user")
const { isSignedin,isAuthenticated,isAdmin } = require("../controllers/auth")

router.param("userID", getUserById);

router.get("/user/:userID", isSignedin,isAuthenticated,getUser);


module.exports = router;