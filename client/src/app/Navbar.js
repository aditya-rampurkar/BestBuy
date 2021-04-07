import React,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {onSearch} from '../features/products/ProductsSlice'
import HomeIcon from '@material-ui/icons/Home';
import {userLogout} from './helper/index'
import {onLogout} from '../features/user/userSlice'
const useStyles = makeStyles((theme) => ({
  AppBar:{
    backgroundColor:"#1976d2"

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const [searchItem,setSearchItem] = useState("")
  const dispatch = useDispatch()

  const itemsInCart = useSelector(state=>state.cart.cart)
  // const totalItems = useSelector(state=>state.products)
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  // console.log("Total Items::",totalItems)
  // const findItems = totalItems.find(item=>item.name === 'Moto')
  // console.log("findItems",findItems)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSearchItemChanged = (e) => setSearchItem(e.target.value)

  const keyPress = (e)=>{
    if(e.keyCode === 13){
         // console.log('value', e.target.value);
         dispatch(onSearch(searchItem))
      }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  
  };
  const handleLogout = () => {
      userLogout(()=>{
        // console.log("successful logout")
        setAnchorEl(null);
        handleMobileMenuClose();
        dispatch(onLogout())
      })
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
    {isLoggedIn?(
      <div>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <Link to="/user" style={{color:"inherit",textDecoration:"none",outline:"none"}}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      </div>
      ):( <Link to={`/auth/login`} style={{color:"inherit",textDecoration:"none",outline:"none"}}>
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
       </Link>)}
      
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={itemsInCart.length} color="secondary">
                  <Link to={`/cart`} style={{color:"#3f51b5",textDecoration:"none",outline:"none"}}><ShoppingCartIcon style={{color:"black"}}/></Link>
            
          </Badge>
        </IconButton>
        <p>Items</p>
      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>

        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {isLoggedIn?<p>Account</p>:<p>Login</p>}
        
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>

      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
           <Link to="/" style={{color:"white",textDecoration:"none",outline:"none"}}>
            <HomeIcon/>
            </Link>
          
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" style={{color:"white",textDecoration:"none",outline:"none"}}>
            Apni Dukan
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchItem}
              onChange={handleSearchItemChanged}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={keyPress}
            />
            
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={itemsInCart.length} color="secondary">
                
                  <Link to={`/cart`} style={{color:"#3f51b5",textDecoration:"none",outline:"none"}}><ShoppingCartIcon style={{color:"white"}}/></Link>
               
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
