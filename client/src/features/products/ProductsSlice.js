import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {allProducts,addProduct,editProduct,removeProduct} from '../../app/helper/index'

const initialState = {
	products:[],
	status:'idle',
	error:null
}


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ()=>{
        // console.log("User Id inside fetchTasks: ",userId)
        const response = await allProducts()
        // console.log("response::",response)
        return response
    }
)

export const addNewProduct = createAsyncThunk(
	'products/addNewProduct',
	async (data)=>{
		const response = await addProduct(data)
		// console.log("Response::::",response)
		return response
	}
)
export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (data)=>{
		const {_id}=data
		const response = await editProduct(data,_id)
		// console.log("Response update:",response)
		return response
	}
	)

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (productId)=>{
		const response = await removeProduct(productId)
		// console.log("Response",response)
		return response
	}
	)

export const ProductsSlice = createSlice({
	name:"products",
	initialState,
	reducers:{
		// addProduct:{
		// 	reducer(state,action){
		// 		console.log("Action payload::",action.payload)
		// 		state.products.push(action.payload.product)
		// 		console.log("Success")
		// 	},
		// 	prepare(product){
		// 		product.id=nanoid()
		// 		return {
		// 			payload:{
		// 				product
		// 			}
		// 		}
		// 	}
		// },
		// updateProduct(state,action){
		// 	console.log("Action Payload update::",action.payload)
		// 	const {
		// 		id,
		// 		name,
		// 		color,
		// 		ram,
		// 		rom,
		// 		warrenty,
		// 		operatingSystem,
		// 		displaySize,
		// 		frontCamera,
		// 		rearCamera,
		// 		modelName,
		// 		modelNumber,
		// 		imageUrl,
		// 		addDate,
		// 		processor,
		// 		battery,
		// 		price,
		// 		qty
		// 	} = action.payload
		// 	console.log("State::",state)

		// 	const existingProduct = state.products.find(product=>product.id===id)
		// 	console.log("existingProduct",existingProduct)
			
		// 	if(existingProduct){
		// 		existingProduct.name=name
		// 		existingProduct.color=color
		// 		existingProduct.ram=ram
		// 		existingProduct.rom=rom
		// 		existingProduct.warrenty=warrenty
		// 		existingProduct.operatingSystem=operatingSystem
		// 		existingProduct.displaySize=displaySize
		// 		existingProduct.frontCamera=frontCamera
		// 		existingProduct.rearCamera=rearCamera
		// 		existingProduct.modelNumber=modelNumber
		// 		existingProduct.modelName=modelName
		// 		existingProduct.imageUrl=imageUrl
		// 		existingProduct.addDate=addDate
		// 		existingProduct.processor=processor
		// 		existingProduct.battery=battery
		// 		existingProduct.price=price
		// 		existingProduct.qty=qty
		// 	}
		// 	console.log("existingProduct",existingProduct)
		// },
		onSearch(state,action){
			// console.log("Payload:::",state)
			const newState = state.products.filter(phone=>phone.name.toLowerCase() === action.payload.toLowerCase())
			// console.log("newState::",newState)
			state.splice(0,state.length,...newState)
		},
		// deleteProduct(state,action){
		// 	const id = action.payload
		// 	const index = state.products.findIndex(product=>product.id === id)
		// 	state.splice(index,1)
		// }
	},
	extraReducers:{
		[fetchProducts.pending]:(state,action)=>{
			state.status="loading"
		},
		[fetchProducts.fulfilled]:(state,action)=>{
			// console.log("Action::::",action.payload)
			state.status="succeeded"
			state.products=state.products.concat(action.payload)
		},
		[fetchProducts.rejected]:(state,action)=>{
			state.status = "failed"
			state.error = action.error.message
		},
		[addNewProduct.fulfilled]:(state,action)=>{
			state.products.push(action.payload)
		},
		[updateProduct.fulfilled]:(state,action)=>{
				const {
				_id,
				name,
				color,
				ram,
				rom,
				warrenty,
				operatingSystem,
				displaySize,
				frontCamera,
				rearCamera,
				modelName,
				modelNumber,
				imageUrl,
				addDate,
				processor,
				battery,
				price,
				qty
			} = action.payload
			// console.log("State::",state)

			const existingProduct = state.products.find(product=>product._id===_id)
			// console.log("existingProduct",existingProduct)
			
			if(existingProduct){
				existingProduct.name=name
				existingProduct.color=color
				existingProduct.ram=ram
				existingProduct.rom=rom
				existingProduct.warrenty=warrenty
				existingProduct.operatingSystem=operatingSystem
				existingProduct.displaySize=displaySize
				existingProduct.frontCamera=frontCamera
				existingProduct.rearCamera=rearCamera
				existingProduct.modelNumber=modelNumber
				existingProduct.modelName=modelName
				existingProduct.imageUrl=imageUrl
				existingProduct.addDate=addDate
				existingProduct.processor=processor
				existingProduct.battery=battery
				existingProduct.price=price
				existingProduct.qty=qty
			}
		},
		[deleteProduct.fulfilled]:(state,action)=>{
			// console.log("Action Payload",action.payload)
			const {_id} = action.payload
			const index = state.products.findIndex(product=>product._id === _id)
			state.products.splice(index,1)
		}
	}
})

export const {onSearch} = ProductsSlice.actions
export default ProductsSlice.reducer