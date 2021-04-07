import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {
		addItemInCart, 
		getItemByIdFromCart, 
		updateItemByIdInCart, 
		removeItemByIdFromCart, 
		listAllItemsOfCart, 
		removeAllItemsFromCart
		} from '../../app/helper/index'

const initialState = {
	totalAmount:0,
	cart:[]
}

export const addItemInCartAction = createAsyncThunk(
	'cart/addItemInCart',
	async (data)=>{
		const {userId,item} = data
		// console.log("UserId::",userId)
		// console.log("Item:",item)
		const response = await addItemInCart(userId,item)
		// console.log("response at thunk:",response)
		return response
	}
)

export const getItemByIdFromCartAction = createAsyncThunk(
	'cart/getItemByIdFromCart',
	async (data)=>{
		const {userId,itemId} = data
		const response = await getItemByIdFromCart(userId,itemId)
		// console.log("response at thunk:",response)
		return response
	}
)

export const updateItemByIdInCartAction = createAsyncThunk(
	'cart/updateItemByIdInCart',
	async (data)=>{
		const {userId,itemId} = data
		const response = await updateItemByIdInCart(userId,itemId,data)
		// console.log("response at thunk:",response)
		return response
	}
)

export const removeItemByIdFromCartAction = createAsyncThunk(
	'cart/removeItemByIdFromCart',
	async (data)=>{
		const {userId,itemId} = data
		const response = await removeItemByIdFromCart(userId,itemId)
		// console.log("response at thunk:",response)
		return response
	}
)

export const listAllItemsOfCartAction = createAsyncThunk(
	'cart/listAllItemsOfCart',
	async (data)=>{
		// console.log("heere")
		const response = await listAllItemsOfCart(data)
		// console.log("response at thunk at listAllItemsOfCartAction:",response)
		return response
	}
)

export const removeAllItemsFromCartAction = createAsyncThunk(
	'cart/removeAllItemsFromCart',
	async (data)=>{
		const response = await removeAllItemsFromCart(data)
		// console.log("response at thunk:",response)
		return response
	}
)

const cartSlice = createSlice({
	name:"cart",
	initialState,
	reducers:{
		addToCart(state,action){
			// const id = action.payload.phone.id
			const existingPhone1 = state.cart.find(phone=>phone._id===action.payload.phone._id)
			if(existingPhone1){
				
				existingPhone1.qty=existingPhone1.qty+1
				state.totalAmount=state.totalAmount+parseFloat(existingPhone1.price)
			}
			else{
				const existingPhone = {...action.payload.phone,qty:1}
				// console.log(existingPhone)
				if(existingPhone){
					// console.log("existingPhone:",existingPhone)
					// existingPhone.qty=action.payload.qty
					state.totalAmount=state.totalAmount+parseFloat(existingPhone.price)
					state.cart.push(existingPhone)

				}
			}
			
			// action.payload.phone.qty=action.payload.qty
			// console.log("Action:",action.payload.phone)
		},
		itemAdded(state,action){
			const {_id,qty} = action.payload
			const existingPhone = state.cart.find(phone=>phone._id===_id)
			if(existingPhone){
				existingPhone.qty = qty+1
				state.totalAmount=state.totalAmount+parseFloat(existingPhone.price)
			}
		},
		itemRemoved(state,action){
			const {_id,qty} = action.payload
			const existingPhone = state.cart.find(phone=>phone._id===_id)
			if(qty>1 && existingPhone){
				existingPhone.qty=qty-1
				state.totalAmount=state.totalAmount-parseFloat(existingPhone.price)
			}
		},
		itemDeletedFromCart(state,action){
			const {_id} = action.payload
			const index = state.cart.findIndex(phone=>phone._id===_id)
			const existingPhone = state.cart.find(phone=>phone._id===_id)
			if(existingPhone){
				state.totalAmount=state.totalAmount-parseFloat(existingPhone.price)*existingPhone.qty
				state.cart.splice(index,1)
			}
			
		},
		success(state){
			state.totalAmount=0
			state.cart.splice(0)
		}
	},
	extraReducers:{
		[addItemInCartAction.fulfilled]:(state,action)=>{
			// console.log("Action payload",action.payload.productId)
			// console.log("inside reducer")
			const existingPhone1 = state.cart.find(phone=>phone.productId===action.payload.productId)
			// console.log("existingPhone1",existingPhone1)
			if(existingPhone1){
				// console.log("Here aayya")
				existingPhone1.productQty=existingPhone1.productQty+1
				state.totalAmount=state.totalAmount+existingPhone1.price
			}
			else{
				const existingPhone = {...action.payload}
				// console.log("existingPhone:",existingPhone)
				if(existingPhone){
					// console.log("existingPhonevvv:",existingPhone)
					// existingPhone.qty=action.payload.qty
					state.totalAmount=state.totalAmount+existingPhone.price
					state.cart.push(existingPhone)

				}
			}
		},
		[getItemByIdFromCartAction.fulfilled]:(state,action)=>{

			// console.log("inside reducer")
		},
		[updateItemByIdInCartAction.fulfilled]:(state,action)=>{
			const {itemId,productQty,type} = action.payload
			const existingPhone = state.cart.find(item=>item._id == itemId)
			if(existingPhone && type=="add"){
				existingPhone.productQty = productQty+1
				state.totalAmount=state.totalAmount+existingPhone.price
			}
			else if(existingPhone && productQty>1 && type == "remove"){
				existingPhone.productQty = productQty-1
				state.totalAmount = state.totalAmount-existingPhone.price
			}
		},
		[removeItemByIdFromCartAction.fulfilled]:(state,action)=>{
			// console.log("action.payload at removeItemByIdFromCart:",action.payload)
			const itemId = action.payload
			const index = state.cart.findIndex(item=>item._id===itemId)
			const existingPhone = state.cart.find(item=>item._id===itemId)
			if(existingPhone){
				state.totalAmount=state.totalAmount-existingPhone.price*existingPhone.productQty
				state.cart.splice(index,1)
			}

		},
		[listAllItemsOfCartAction.fulfilled]:(state,action)=>{
			// console.log("all action payload",action.payload)
			if(action.payload)
			{
				state.totalAmount = action.payload.totalAmount
				state.cart = action.payload.items	
			}
			
			// console.log("inside reducer")
		},
		[removeAllItemsFromCartAction.fulfilled]:(state,action)=>{
			state.totalAmount=0
			state.cart=[]
		},
	}
})

export const {addToCart,itemAdded,itemRemoved,itemDeletedFromCart,success} = cartSlice.actions
export default cartSlice.reducer