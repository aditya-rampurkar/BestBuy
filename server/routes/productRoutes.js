const express = require('express')
const router = express.Router()

const {addProduct, listAllProducts, editProduct, deleteProduct, searchProducts} = require("../controllers/productController")

router.post("/add",addProduct)

router.get("/listall",listAllProducts)

router.get("/products",searchProducts)

router.put("/edit/:productId",editProduct)

router.delete("/delete/:productId",deleteProduct)

module.exports = router

// AdWuFQAaSiuk6PKV3se5Pg8A0IQhig-mDYyDKDEEmSdOOHlIG2B1gsvoPqBztWFbT6vTKzaBb6ewoWFL