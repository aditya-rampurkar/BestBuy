import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import userImage from '../../assets/images/user.png'
import {Redirect} from 'react-router-dom'
import {listAllOrders} from '../../app/helper/index'
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginLeft:30,
    marginRight:30,
    marginTop:40
  },
  root1:{
    maxWidth:800,
    marginTop:40
  },
  profile:{
    width:150,
    height:150,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:"50%"
  },
  userGrid:{
     display: "flex",
     flexDirection: "column",
     width: "100%",
     alignItems: "center"
  }
});

export default function UserProfile({product}) {
  const classes = useStyles();
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  const userData = useSelector(state=>state.user.isLoggedIn.user)
  const [orders,setOrders] = useState()
  // useEffect(async()=>{
  //   if(isLoggedIn){
  //     const result = await listAllOrders(isLoggedIn.user._id)
  //     if(result && result.order)
  //     {
  //       setOrders(result.order)
  //     }
  //   }
  // },[isLoggedIn])
  useEffect(()=>{
    async function fetchData(){
      if(isLoggedIn){
        const result = await listAllOrders(isLoggedIn.user._id)
        if(result && result.order)
        {
          setOrders(result.order)
        }
    }
    }
    fetchData()
  },[isLoggedIn])
  // console.log("setOrders",orders)
  return (
    <React.Fragment>
    {isLoggedIn?(
        <Card className={classes.root}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4} className={classes.userGrid}>
      <CardMedia
          component="img"
          alt="user profile"
          image={userImage}
          className={classes.profile}
          title="user profile"
        />
        <CardContent >
            <Typography variant="body2" color="textSecondary" component="h3">
                Name: {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h3">
                Email: {userData.email} 
            </Typography>
        </CardContent>
        </Grid>
         <Grid item xs={12} sm={7} md={8} style={{paddingTop:20}}>
         <CardContent>
           <Typography variant="body2" color="textSecondary" component="h3">
           Past Orders:
           <ul>
            {orders && orders.length>0 ? orders.map(order=>(<li key={order._id}>
              <p>Status::{order.status}</p>
              <p>Total Amount:: ₹{order.totalAmount}</p>
              <p>Products:</p>
              <ul>

              {order.items.length>0 && order.items.map(item=>(
                <li key={item._id}>
                <p>Item Name::{item.name} {item.modelName}</p>
                <p>Qty:{item.productQty}</p>
                <p>Price:₹{item.price}</p>
                </li>
                ))}
              </ul>

              </li>)):<CircularProgress/>}
           </ul>
          </Typography>
        </CardContent>
      </Grid>
      </Grid>
    </Card>
      ):<Redirect to="/auth/login"/>}
    </React.Fragment>
    
  );
}
