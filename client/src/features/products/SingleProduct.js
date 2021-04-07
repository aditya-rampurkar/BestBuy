import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux'
import {addItemInCartAction} from '../cart/cartSlice'
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // marginLeft:30,
    marginTop:40
  },
  root1:{
    maxWidth:800,
    marginTop:40
  },
   media:{
    width:154,
    paddingLeft:80,
    paddingTop:35,
    paddingBottom:20
  }
});

export default function SingleProduct({match}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  // console.log("Phone::",phone)
  const {productId} = match.params
  // console.log("Match::",match.params)
  const product = useSelector(state=>
                  state.products.products.find(product=>product._id===productId)
                  )
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  // console.log(product)
  const handleAddCart = ()=>{
    if(isLoggedIn){
      const {user} = isLoggedIn
      // console.log("User Id:",user._id)
      // console.log("Phone::",phone)
      dispatch(addItemInCartAction({userId:user._id,item:product}))
    }
    else{
      // console.log("here aaya")
      // window.alert("Not Authenticated")
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4}>
        <Card className={classes.root}>
        <CardMedia
          classes={{
            media:classes.media
          }}
          component="img"
          alt={product.name}
          image={product.imageUrl}
          title={product.name}
        />
      
    </Card>
    </Grid>
    <Grid item xs={12} sm={7} md={8}>
      <Card className={classes.root1}>
        <CardContent>
          <Typography gutterBottom variant="h5" >
            {product.name ? product.name :"Not Available"} {product.modelName? product.modelName:" "}({product.color? product.color:"Not Available"},{product.rom? `${product.rom} GB`:"Not Available"})({product.ram? `${product.ram} GB RAM`:"Not Available"})
          </Typography>
          <Typography  variant="h4"  >
           Price: ₹{product.price ? product.price : "Not Available"}
          </Typography>

           <Typography variant="body2" color="textSecondary" component="h3" style={{marginTop:20,marginBottom:20}}>
           Warrenty: {product.warrenty? `${product.warrenty}  Year for Handset, 6 Months for Accessories`:"Not Available"}
          </Typography>

           <Typography variant="body2" color="textSecondary" component="h3">
           Heightlights:
           <ul>
            <li>{product.ram? `${product.ram} GB RAM`:"Not Available"} || {product.ram? `${product.rom} GB ROM`:"Not Available"}</li>
            <li>{product.displaySize? `${product.displaySize} cm Full HD+ Display`:"Not Available"}</li>
            <li>{product.rearCamera? `${product.rearCamera} MP`:"Not Available"} || {product.frontCamera? `${product.frontCamera} MP Front Camera`:"Not Available"}</li>
            <li>{product.battery? `${product.battery}  mAh Lithium-ion Polymer Battery`:"Not Available"}</li>
            <li>{product.processor? product.processor:"Not Available"}</li>
            <li>Operating System: {product.operatingSystem? product.operatingSystem:"Not Available"}</li>
            <li>Launch Date: {product.addDate? product.addDate:"Not Available"}</li>
           </ul>
          
          </Typography>
          
          
          
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handleAddCart}>
          <Link to={`/cart`} style={{color:"#3f51b5",textDecoration:"none",outline:"none"}}>Buy</Link>
        </Button>
        
      </CardActions>
      </Card>
    
    </Grid>
    </Grid>
  );
}
