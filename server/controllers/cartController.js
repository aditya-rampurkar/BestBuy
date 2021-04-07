const Cart = require('../models/Cart')

module.exports.addItem = (req,res)=>{
	const userId = req.params.userId
	const {_id,
			name,
			price,
			color,
			ram,
			rom,
			modelNumber,
			modelName,
			frontCamera,
			rearCamera,
			processor,
			imageUrl,
			operatingSystem,
			warrenty,
			battery,
			displaySize}=req.body
	Cart.findOne({userId},function(err,doc){
		if(err) throw err
		if(doc){
			const index = doc.items.findIndex(item=>item.productId === _id)
			doc.totalAmount=doc.totalAmount+parseFloat(price)
			// console.log("doc items",doc.items)
			// console.log("index",index)
			if(index>=0){
				doc.items[index].productQty = doc.items[index].productQty+1
			}
			else{
				const newItem = {
					productId:_id,
					productQty:1,
					name,
					price,
					color,
					ram,
					rom,
					modelNumber,
					modelName,
					frontCamera,
					rearCamera,
					processor,
					imageUrl,
					operatingSystem,
					warrenty,
					battery,
					displaySize

				}
				doc.items.push(newItem)

			}
			doc.save(function(err,result){
				if(err) throw err
				// console.log("results:",result)
				const index1 = result.items.findIndex(item=>item.productId === _id)
				return res.json(result.items[index1])
			})
			// console.log("DOC",doc)
			// res.json(doc)
		}
		else{
			const newItem = [{
					productId:_id,
					productQty:1,
					name,
					price,
					color,
					ram,
					rom,
					modelNumber,
					modelName,
					frontCamera,
					rearCamera,
					processor,
					imageUrl,
					operatingSystem,
					warrenty,
					battery,
					displaySize
			}]
			const totalAmount = parseFloat(price)
			// console.log("Item Added")
			const newItemInCart = new Cart({
				userId,
				totalAmount,
				items:newItem
			})
			newItemInCart.save(function(err,result){
				if(err) throw err
				// console.log("Items::",result.items)
				res.json(result.items[0])
			})
			// return res.json(newItem)
		}
		
	})


}

module.exports.listAllItems = (req,res)=>{
	const userId = req.params.userId
	Cart.findOne({userId},function(err,doc){
		if(err) throw err
		// console.log("result",doc)
		res.json(doc)
	})
}

module.exports.removeItem = (req,res)=>{
	const userId = req.params.userId
	const itemId = req.params.itemId
	// console.log("userId:",userId)
	// console.log("itemId:",itemId)
	Cart.findOne({userId},function(err,doc){
		if(err) throw err

		const index = doc.items.findIndex(d=>d._id == itemId)
		// console.log("Index",index)
		if(index>=0){
			doc.totalAmount = doc.totalAmount - (doc.items[index].price)*(doc.items[index].productQty)
			doc.items.splice(index,1)
			doc.save(function(err,result){
			if(err) throw err
			res.json(itemId)
		})
		}

		
	})
}

module.exports.updateItem = (req,res)=>{
	const userId = req.params.userId
	const itemId = req.params.itemId
	const type = req.body.type
	// console.log("userId",userId)
	// console.log("itemId",itemId)
	// console.log("type",type)
	Cart.findOne({userId},function(err,doc){
		if(err) throw err

		const index = doc.items.findIndex(d=>d._id == itemId)
		if(index>=0 && type == "add"){
			doc.items[index].productQty = doc.items[index].productQty+1
			doc.totalAmount = doc.totalAmount+doc.items[index].price
		}
		else if(index>=0 && type == "remove" && doc.items[index].productQty>1){
			doc.items[index].productQty = doc.items[index].productQty-1
			doc.totalAmount = doc.totalAmount-doc.items[index].price
		}
		doc.save(function(err,result){
			if(err) throw err

			res.json(req.body)
		})
	})
}

module.exports.removeAllItems = async (req,res)=>{
	const userId = req.params.userId
	const result = await Cart.deleteMany({userId})
	// console.log("result at deleteMany",result)
	res.json(result)

}

module.exports.getItemById = (req,res)=>{
	// console.log("getItemById")
}