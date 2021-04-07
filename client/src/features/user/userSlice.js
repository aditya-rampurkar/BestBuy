import {createSlice} from '@reduxjs/toolkit'
import {isAuthenticated} from '../../app/helper/index'

const initialState = {
	isLoggedIn:isAuthenticated(),

}

const userSlice = createSlice({
	name:"user",
	initialState,
	reducers:{
		onLogin(state,action){
			state.isLoggedIn=isAuthenticated()
		},
		onLogout(state,action){
			state.isLoggedIn=false
		}
	}
})

export const {onLogout, onLogin} = userSlice.actions
export default userSlice.reducer
