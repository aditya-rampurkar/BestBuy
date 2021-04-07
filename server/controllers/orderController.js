const Order = require('../models/Order')
const Cart = require('../models/Cart')

module.exports.getAllOrders = async (req,res)=>{
	const userId = req.params.userId
	const order = await Order.findOne({userId}).populate('order')
	res.send(order)
}

module.exports.newOrder = async (req,res)=>{
	const userId = req.params.userId
	// console.log("userId",userId)
	// console.log("body",req.body)
	// const {contact} = req.body/
	const cart = await Cart.findOne({userId})

	const order = {
		totalAmount:cart.totalAmount,
		items:cart.items,
		contact:req.body
	}

	const oldOrder = await Order.findOne({userId})
	if(oldOrder){
		oldOrder.order.push(order)
		const result = await oldOrder.save()
		// console.log("New Order:",result)
		res.json(result)
	}
	else{
		const newOrd = new Order({
			userId,
			order:[order]
		})
		const result = await newOrd.save()
		// console.log("result",result)
		res.json(result)
	}
	// const newOrd = new Order({
	// 	'order.totalAmount':cart.totalAmount,
	// 	'order.items':cart.items,
	// 	userId:userId,
	// 	contact:req.body
	// })
	// console.log("New Order:",newOrd)
	// newOrd.save(function(err,doc){
	// 	if(err) throw err

	// 	console.log("result doc::",doc)
	// 	res.json(doc)
	// })
	// res.json(req.body)
}
