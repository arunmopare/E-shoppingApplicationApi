var express = require('express');
var router = express.Router()


const { signout, signup, signin, isSignedin} = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

router.post("/signup", [
    check("name", "name shoul be atleast 3 charecter").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password must be atlest 6 char").isLength({ min: 6 })
], signup);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 6 })
], signin);


router.get("/signout", signout);

router.get("/testRoute", isSignedin,(req,res)=>{
    res.json(req.auth)
});

module.exports = router;