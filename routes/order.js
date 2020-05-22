const express = require('express');
const router = express.Router()

const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders,getOrdersStatus,updateStatus} = require("../controllers/order");


const { } = require("../controllers/order")

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual rotess

//create 
router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//read
router.get("/oreder/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders)

//status of orders
router.get("/oreder/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrdersStatus)
router.put("/oreder/:orderID/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus)

module.exports = router;