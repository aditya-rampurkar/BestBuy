import React,{useContext, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Product from './Product'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from './ProductsSlice'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
    justifyContent:"center",
    flexGrow: 1,
    marginTop:30,
    padding: theme.spacing(1),
    width:"100%",
    maxWidth:"1475px"
  },
  
  control: {
    padding: theme.spacing(2),
  },
  gridClass:{
    padding:"8px"
  }
}));

export default function Home(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const productsStatus = useSelector(state=>state.products.status)
  const products = useSelector(state=>state.products.products)




  useEffect(()=>{
    if(productsStatus === 'idle'){
      dispatch(fetchProducts())
    }
    
  },[productsStatus,dispatch,products])



  return (
       <Paper className={classes.root}>
           
       <Grid container className={classes.gridClass} style={{justifyContent:"center",overflowX:"hidden"}}>

        {products.map((phone,i)=>(
            <Product key={i} phone={phone}/>
        ))}

       </Grid>
       
       
       </Paper>
  );
}