import API from './api'

export const userSignup = (data)=>{
	return fetch(`${API}/auth/signup`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}

export const userLogin = (data)=>{
	return fetch(`${API}/auth/login`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})
	.then(response=>response.json())
	.catch(err=>console.log(err))

}

export const userLogout =(next)=>{
	if(typeof window !== "undefined"){
		localStorage.removeItem("jwt")
		next()
		//api call from backend logout
	}
}

export const authenticate =(data,next)=>{
	if(typeof window !=="undefined"){
		localStorage.setItem("jwt",JSON.stringify(data))
		next()
	}
}

export const isAuthenticated =()=>{
	if(typeof window === "undefined"){
		return false
	}
	if(localStorage.getItem("jwt")){
		return JSON.parse(localStorage.getItem("jwt"))
	}
	else{
		return false
	}
}

export const addProduct = (data)=>{
	// console.log("Product at index",data)
	return fetch(`${API}/product/add`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	}).then(response=>{
		// console.log("Response inside:",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const editProduct = (data,productId)=>{
	// console.log("Product at index",data)
	return fetch(`${API}/product/edit/${productId}`,{
		method:"PUT",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	}).then(response=>{
		// console.log("Response inside:",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const allProducts = ()=>{
	// console.log("hello")
	return fetch(`${API}/product/listall`,{
		method:"GET"
	}).then(response=>{
		// console.log("Response index::",response)
	   return response.json()})
	.catch(err=>console.log(err))
}

export const removeProduct = (productId)=>{
	return fetch(`${API}/product/delete/${productId}`,{
		method:"DELETE"
	}).then(response=>{
		// console.log("Response inside:",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const addItemInCart = (userId,data)=>{
	// console.log("data in addItemInCart",data)
	return fetch(`${API}/cart/addItem/${userId}`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	}).then(response=>{
		// console.log("response:::->",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const getItemByIdFromCart = (userId,itemId)=>{
	return fetch(`${API}/cart/getItemById/${userId}/${itemId}`,{
		method:"GET"
	}).then(response=>{
		// console.log("Response:::",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const updateItemByIdInCart = (userId,itemId,data)=>{
	return fetch(`${API}/cart/updateItem/${userId}/${itemId}`,{
		method:"PUT",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	}).then(response=>{
		// console.log("Response::",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const removeItemByIdFromCart = (userId,itemId)=>{
	return fetch(`${API}/cart/removeItem/${userId}/${itemId}`,{
		method:"DELETE"
	}).then(response=>{
		// console.log("response:::",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const listAllItemsOfCart = (userId)=>{
	return fetch(`${API}/cart/listAllItems/${userId}`,{
		method:"GET"
	}).then(response=>{
		// console.log("response::",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const removeAllItemsFromCart = (userId)=>{
	return fetch(`${API}/cart/removeAllItems/${userId}`,{
		method:"DELETE"
	}).then(response=>{
		// console.log("response::",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const addNewOrder = (data)=>{
	const {userId,contact} = data
	return fetch(`${API}/order/neworder/${userId}`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(contact)
	}).then(response=>{
		// console.log("Response",response)
		return response.json()
	}).catch(err=>console.log(err))
}

export const listAllOrders = (userId)=>{
	return fetch(`${API}/order/allorders/${userId}`,{
		method:"GET"
	}).then(response=>{
		return response.json()
	}).catch(err=>console.log(err))
}