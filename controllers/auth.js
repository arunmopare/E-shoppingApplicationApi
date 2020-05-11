const User = require("../models/user");


const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const ExpressJwt = require('express-jwt');


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Sign Out successfully"
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email does not exist"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and Password does not match"
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put this token in users browser cookie
        res.cookie("token", token, { expire: new Date() + 999 });
        //send responce to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } })
    });

}

exports.signup = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }

        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

//protected routes
exports.isSignedin = ExpressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//custom middleware

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!check) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if(req.profile.role===0){
        return res.status(403).json({
            error : "You Are not ADMIN , Access Denied"
        })
    }
    next();
}