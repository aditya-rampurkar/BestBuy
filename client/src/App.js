import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from './app/Navbar'
import UserLogin from './features/user/UserLogin'
import UserSignup from './features/user/UserSignup'
import Home from './features/products/Home'
import SingleProduct from './features/products/SingleProduct'
import AddProductForm from './features/admin/AddProductForm'
import EditProduct from './features/admin/EditProduct'
import CartHome from './features/cart/CartHome'
import UserProfile from './features/user/UserProfile'
import AdminDashboard from './features/admin/AdminDashboard'
import ContactForm from './features/cart/ContactForm'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/auth/login" component={UserLogin}/>
          <Route exact path="/auth/signup" component={UserSignup}/>
          <Route exact path="/product/:productId" component={SingleProduct}/>
          <Route exact path="/addproduct" component={AddProductForm}/>
          <Route exact path="/editproduct/:productId" component={EditProduct}/>
          <Route exact path="/cart" component={CartHome}/>
          <Route exact path="/user" component={UserProfile}/>
          <Route exact path="/admin" component={AdminDashboard}/>
          <Route exact path="/order" component={ContactForm}/>
        </Switch>
      </Router>
     
    </div>
    )
}

export default App