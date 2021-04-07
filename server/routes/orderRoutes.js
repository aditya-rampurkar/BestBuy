const express = require('express')
const router = express.Router()

const {getAllOrders,newOrder} = require("../controllers/orderController")

router.get("/allorders/:userId",getAllOrders)
router.post("/neworder/:userId",newOrder)

module.exports = router