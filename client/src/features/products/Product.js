import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {addItemInCartAction} from '../cart/cartSlice'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:10,
    padding:18
  },
  media:{
    width:100,
    paddingLeft:50,
  }
});

export default function Product({phone}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  // console.log("Phone::",phone)
  const handleAddCart = ()=>{
    // console.log("clicked")
    // phone.qty=1
    if(isLoggedIn){
      const {user} = isLoggedIn
      // console.log("User Id:",user._id)
      // console.log("Phone::",phone)
      dispatch(addItemInCartAction({userId:user._id,item:phone}))
    }
    else{
      // console.log("here aaya")
      // window.alert("Not Authenticated")
    }
  }


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          classes={{
            media:classes.media
          }}
          component="img"
          alt={phone.name}
          image={phone.imageUrl}
          title={phone.name}
        />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {phone.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
           Price: ₹{phone.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleAddCart}>
          <Link to={`/cart`} style={{color:"#3f51b5",textDecoration:"none",outline:"none"}}>Add Cart</Link>
         
        </Button>
        <Button size="small" color="primary">
          <Link to={`/product/${phone._id}`} style={{color:"#3f51b5",textDecoration:"none",outline:"none"}}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
