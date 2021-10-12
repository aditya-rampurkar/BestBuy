const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
// const paymentRoutes = require('./routes/paymentRoutes')

const mongoUrl = "mongodb+srv://vikas:vikas123@apnidukan.d2e3h.mongodb.net/apniDukan?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.get("/",(req,res)=>{
	res.send("Running")
})

app.use("/auth",userRoutes)
app.use("/product",productRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)
// app.use("/payment",paymentRoutes)

app.listen(port,(req,res)=>console.log(`Server is running at ${port}`))