import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useSelector,useDispatch} from 'react-redux'
import CartCard from './CartCard'
import Button from '@material-ui/core/Button';
import {listAllItemsOfCartAction} from './cartSlice'
import {Redirect} from 'react-router-dom'
import ContactForm from './ContactForm'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:30
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  leftSide:{
    width:"100%",
    height:"100%"
  },
  rightSide:{
    width:"100%",
    height:"100%"
  },
  gridClass:{
    padding:"8px"
  },
  buttonClass:{
    marginTop:10,
    color:"white"
  },
  ulClass:{
    float:"right",
    margin:10,
    listStyleType:"none"
  }
}));

export default function CartHome() {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const dispatch = useDispatch()
  const products = useSelector(state=>state.cart)
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
 
  const handleCheckout = ()=>{
    setOpen(true);
  }

  useEffect(()=>{
   if(isLoggedIn){
      // console.log("Hi")
      const {user} = isLoggedIn
      dispatch(listAllItemsOfCartAction(user._id))
   } 
  },[isLoggedIn,dispatch])
  return (
      <React.Fragment>

      {isLoggedIn?(

          <Paper>
           <ContactForm open={open} setOpen={setOpen} userId={isLoggedIn.user._id}/>
          {products.cart.length>0?(<div>
            {products.cart.map(product=>(
            <CartCard key={product._id} product={product}/>
             ))} 
            <ul className={classes.ulClass}>
              <li>Total Amount: ₹{products.totalAmount}</li>
              <li>
                <Button style={{ backgroundColor: '#1976d2' }} className={classes.buttonClass} onClick={handleCheckout}>
                  Checkout
                </Button>
              </li>
            </ul>
            </div>):(<p>No product here</p>)
          }
        </Paper>):(<Redirect to="/auth/login"/>)}
    </React.Fragment>

    )
}