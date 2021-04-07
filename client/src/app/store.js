import {configureStore} from '@reduxjs/toolkit'
import ProductsReducer from '../features/products/ProductsSlice'
import CartReducer from '../features/cart/cartSlice'
import UserReducer from '../features/user/userSlice'
export default configureStore({
	reducer:{
		products:ProductsReducer,
		cart:CartReducer,
		user:UserReducer
	}
})