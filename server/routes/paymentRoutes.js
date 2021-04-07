const express = require('express')
const router = express.Router()
const stripe = require('stripe')("sk_test_51IdBarSBk99InpdEEW4yl6oonDMqinOk2PCpDgmHANePZ2ZCU9dYd990WKbqH1t4pPRJAHtDfuB0p4UOYSX7MsNj00P95lp5CL")
const uuid = require('uuid/v4')

router.post("/",(req,res)=>{
	const {product, token} = req.body
	console.log("Product ",product)
	console.log("Price ",product.price)
	const idempotency_key = uuid()

	return stripe.customers.create({
		email:token.email,
		source:token.id
	}).then(customer => {
		stripe.charges.create({
			amount: product.price * 100,
			currency: 'usd',
			customer:customer.id,
			receipt_email: token.email,
			description:`purchase of ${product.name}`,
			shipping:{
				name:token.card.name,
				address :{
					country: token.card.address_country
				}
			}
		},{idempotency_key})
	})
	.then(result => res.status(200).json(result))
	.catch(err => console.log(err))

})

module.exports = router