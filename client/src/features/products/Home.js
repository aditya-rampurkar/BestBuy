import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Product from './Product'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from './ProductsSlice'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:30,
    padding: theme.spacing(1),
    width:"80%",
    marginLeft:"7%"
  },
  
  control: {
    padding: theme.spacing(2),
  },
  gridClass:{
    padding:"8px"
  }
}));

export default function Home() {
  const classes = useStyles();

  const dispatch = useDispatch()

  const productsStatus = useSelector(state=>state.products.status)
  const products = useSelector(state=>state.products.products)
  // console.log("Dummy Data:",products)

  useEffect(()=>{
    if(productsStatus === 'idle'){
      dispatch(fetchProducts())
    }
    
  },[productsStatus,dispatch,products])

  return (
       <Paper className={classes.root}>
       <Grid container className={classes.gridClass}>

      {products.length>0?products.map(phone=>(

            <Product key={phone._id} phone={phone}/>

        )):<CircularProgress/>}


       </Grid>
       
       
       </Paper>
  );
}