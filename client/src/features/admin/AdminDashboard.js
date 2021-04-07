import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {useSelector,useDispatch} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import {deleteProduct,fetchProducts} from '../products/ProductsSlice'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    marginTop:30,
    maxWidth: "100%",
    marginLeft:30,
    marginRight:30,
  },
  container: {
    maxHeight: 340,
  },
}));


export default function AdminDashboard({product}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const productsStatus = useSelector(state=>state.products.status)
  const products = useSelector(state=>state.products.products)


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (productId)=>{
    dispatch(deleteProduct(productId))
    // console.log(productId)
  }

  useEffect(()=>{
    if(productsStatus === 'idle'){
      dispatch(fetchProducts())
    }
    
  },[productsStatus,dispatch,products])
  
  return (
    <React.Fragment>
      <Card className={classes.root}>
      <h2>Admin DashBoard</h2>
     
      <Button style={{ backgroundColor: '#1976d2' }} variant="contained" >
         <Link to="/addproduct" style={{textDecoration:"none",outline:"none",color:"white"}}>
         Add product
      </Link>
      </Button>

      <h3>Available Products</h3>
       <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>
                Delete
              </TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                  <TableCell>{product.name} {product.modelName}({product.color},{product.rom} GB)({product.ram} GB RAM)</TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={()=>handleDelete(product._id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Link to={`/editproduct/${product._id}`} style={{textDecoration:"none",outline:"none"}}>
                         <EditIcon/>
                      </Link>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
      
    </React.Fragment>
    
  );
}
