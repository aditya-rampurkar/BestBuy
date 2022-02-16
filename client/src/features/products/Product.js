import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link, useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {addItemInCartAction} from '../cart/cartSlice'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles({
  root: {
    width:185,
    margin:10,
    padding:10,
    alignItems:"center"
  },
  media:{
    width:100,
    height:200,
    paddingLeft:50,
    objectFit:"contain",
  }
});

export default function Product({phone}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();

  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  // console.log("Phone::",phone)
  const handleAddCart = ()=>{
    // console.log("clicked")
    // phone.qty=1
    if(isLoggedIn){
      const {user} = isLoggedIn
      // console.log("User Id:",user._id)
      // console.log("Phone::",phone)
      dispatch(addItemInCartAction({userId:user._id,item:phone}));
      toast(`${phone.name} ${phone.modelName} added to Cart`);

    }
    else{
      // console.log("here aaya")
      // window.alert("Not Authenticated")
    }
  }


  return (
    <>
    <ToastContainer/>
    <Card className={classes.root}>
      <Link to = {`/product/${phone._id}`}>
      <CardActionArea style={{height:"86%"}}>
        <CardMedia
          classes={{
            media:classes.media
          }}
          component="img"
          alt={phone.name}
          image={phone.imageUrl}
          title={phone.name}
        />
        
        <CardContent style={{textAlign:"center"}}>
          <Typography gutterBottom variant="h5" component="h2">
            {phone.name}{" "}{phone.modelName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
           Price: ₹{phone.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>

      <CardActions style={{display:"flex",justifyContent:"center"}}>
        <Button style={{ backgroundColor: '#1976d2' }} size="small" variant="contained" onClick={handleAddCart} startIcon={<ShoppingCartIcon style={{color:"#fff"}}/>}>
          <span style={{color:"#fff",textDecoration:"none",outline:"none"}}>Add Cart</span>
        </Button>
      </CardActions>
    
    </Card>
    </>
  );
}
