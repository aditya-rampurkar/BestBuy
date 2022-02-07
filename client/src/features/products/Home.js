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

  const [search,setSearch] = useState([]);

  const productsStatus = useSelector(state=>state.products.status)
  const products = useSelector(state=>state.products.products)
  // console.log("Dummy Data:",products)



  useEffect(()=>{
    if(productsStatus === 'idle'){
      dispatch(fetchProducts())
    }
    
  },[productsStatus,dispatch,products])

  useEffect(()=>{
    const arr = localStorage.getItem("search");
    setSearch(JSON.parse(arr));
  
  },[search])



  return (
       <Paper className={classes.root}>
           
       <Grid container className={classes.gridClass} style={{justifyContent:"center",overflowX:"hidden"}}>

      {console.log(search)}
      {search.length>0?search.map(phone=>(

            <Product key={phone._id} phone={phone}/>

        )):<h1 style={{color:"#1976d2"}}>Match Not Found</h1>}

    


       </Grid>
       
       
       </Paper>
  );
}