const Product = require('../models/Product')

module.exports.addProduct = (req,res)=>{
	// console.log("Body:",req.body)
	const newProduct = new Product(req.body)
	newProduct.save(function(err,result){
		if(err) throw err

		res.json(result)
	})
}

module.exports.listAllProducts = (req,res)=>{
	Product.find(function(err,result){
		if(err){
			console.log(err)
			throw err
		}
		res.json(result)
	})
}

module.exports.editProduct = (req,res)=>{

	// console.log("Body::",req.body)
	const productId = req.params.productId
	Product.findOneAndUpdate({_id:productId}, req.body, {upsert: true}, function(err, result) {
    if(err) throw err
    // console.log("Response:::",result)
	Product.findById({_id:productId},function(err,result){
		if(err) throw err
    	res.json(result)

	})
});

}

module.exports.deleteProduct = (req,res)=>{
	const productId = req.params.productId
	Product.findOneAndRemove({_id:productId},function(err,result){
		if(err) throw err
		// console.log("Response::",result)
		return res.json(result)
	})
}

module.exports.searchProducts = async(req,res)=>{
let search = req.query.search;

let searchObj = {}
if (search)
	searchObj = {
		$or: [{
			name: {
				$regex: search,
				$options:"i"
			}
		},
		{
			modelName:{
				$regex:search,
				$options:"i"
			}
		}
	]
	}
searchObj = {
	...searchObj,
}


try {
	
	let products = await Product.find(searchObj)
		
	const result = {
		products: products,
	}
	res.send(result)
} catch (e) {
	console.log(e)
}
}