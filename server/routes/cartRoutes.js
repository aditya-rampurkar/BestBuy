const express = require('express')
const {
	addItem, 
	getItemById, 
	updateItem, 
	removeItem, 
	listAllItems, 
	removeAllItems
	} = require('../controllers/cartController')


const router = express.Router()

router.post("/addItem/:userId",addItem)
router.get("/getItemById/:userId/:itemId",getItemById)
router.put("/updateItem/:userId/:itemId",updateItem)
router.delete("/removeItem/:userId/:itemId",removeItem)
router.get("/listAllItems/:userId",listAllItems)
router.delete("/removeAllItems/:userId",removeAllItems)

module.exports = router