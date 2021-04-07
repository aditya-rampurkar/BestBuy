import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {
    updateItemByIdInCartAction, 
    removeItemByIdFromCartAction, 
    } from './cartSlice'
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
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

export default function CartCard({product}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  // const [qty,setQty] = useState(product.qty)
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  const handleAdd = (itemId)=> {
   if(isLoggedIn){
      const {user} = isLoggedIn
      dispatch(updateItemByIdInCartAction({userId:user._id,itemId,type:"add",productQty:product.productQty}))
    }
  }
  const handleRemove = (itemId)=> {
    if(isLoggedIn){
      const {user} = isLoggedIn
      dispatch(updateItemByIdInCartAction({userId:user._id,itemId,type:"remove",productQty:product.productQty}))
    }
  }

  const handleDeleteFromCart = (productId) => {
    // console.log("product Id at handleDeleteFromCart:",productId)
    if(isLoggedIn){
      const {user} = isLoggedIn
      // console.log("hello")
      dispatch(removeItemByIdFromCartAction({userId:user._id,itemId:productId}))

    }
  }
  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4}>
      <CardMedia
           classes={{
                media: classes.media, // class name, e.g. `classes-nesting-root-x`
              }}
          component="img"
          alt={product.name}
          image={product.imageUrl}
          title={product.name}
        />
        </Grid>
         <Grid item xs={12} sm={7} md={8}>
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
           </ul>
          
          </Typography>
          
          
          
        </CardContent>
        <CardActions>
        <IconButton color="primary" onClick={()=>handleRemove(product._id)}>
          <RemoveCircleIcon/>
        </IconButton>
        {product.productQty}
        <IconButton color="primary" onClick={()=>handleAdd(product._id)}>
          <AddCircleIcon/>
        </IconButton>
        <IconButton color="primary" onClick={()=>handleDeleteFromCart(product._id)}>
          <DeleteIcon/>
        </IconButton>
        
      </CardActions>
      </Grid>
      </Grid>
    </Card>
    
  );
}
