const express = require('express')
const router = express.Router()

const {addProduct, listAllProducts, editProduct, deleteProduct} = require("../controllers/productController")

router.post("/add",addProduct)

router.get("/listall",listAllProducts)

router.put("/edit/:productId",editProduct)

router.delete("/delete/:productId",deleteProduct)

module.exports = router