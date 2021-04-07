const User = require("../models/User")
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

module.exports.userLogin = [
	body("email","Email is required").isEmail(),
	body("password","Minimum 5 char password is required").isLength({min:5}),
	(req,res)=>{
		// console.log("Body::",req.body)
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			// console.log("inside validation errors")
			res.json({error:errors.errors[0].msg})
		}
		else{
			const {email,password} = req.body
			User.findOne({email}).exec(function(err,user){
				if(err) throw err
				if(!user){
					// console.log("inside not user,",user)
					res.json({"error":"User not found"})
				}
				else{
					// console.log("here")
					const {_id,firstName,lastName,email} = user
					bcrypt.compare(password,user.password,function(err,result){
						if(err) throw err
						if(!result){
							res.json({"error":"Invalid username or password"})
						}
						else{
							const token=jwt.sign({_id:user._id,tokenId:uuidv4()},"vikassharma")
							res.json({token,user:{_id,firstName,lastName,email}})
						}
					})
				}
			})
		}
	}
]

module.exports.userSignup = [
	body("firstName","Invalid firstName").not().isEmpty().trim().escape(),
	body("lastName","Invalid lastName").not().isEmpty().trim().escape(),
	body("email","Email is required").isEmail(),
	body("password","Minimum 5 char long password is required").isLength({min:5}),
	(req,res)=>{
		// console.log(req.body)
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			res.json({"error":errors.errors[0].msg})
		}
		else{
			const {firstName,lastName,email,password} = req.body
			User.findOne({email}).exec(function(err,user){
				if(err) throw err
				if(user){
					res.json({"error":"User already exists!"})
				}
				else{
					const newUser = new User(req.body)
					bcrypt.hash(password,10,function(err,hash){
						newUser.password=hash
						newUser.save(function(err,result){
							if(err) throw err
							res.json(result)
						})
					})
				}
			})
		}
		
	}
]

module.exports.userLogout = (req,res)=>{
	res.send("userLogout")
}
