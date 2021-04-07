import React,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {userLogin,authenticate} from '../../app/helper/index'
import {useDispatch,useSelector} from 'react-redux'
import {onLogin} from './userSlice'
const useStyles = makeStyles({
	main:{
		display:"flex",
		justifyContent:"center",
		width:"100%",
		marginTop:"100px"
	},
  root: {
    width: "400px",
    display:"flex",
    flexDirection:"column"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  loginButton:{
  	color:"white",
    marginTop: "20px",
    marginRight: "auto"
  },
  textField:{
  	marginRight:"30px"
  },
  error:{
    color:"red"
  },
  // contained:hover:{

  // }
});

export default function UserLogin() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState(false)

  const handleEmailChanged = e => setEmail(e.target.value)
  const handlePasswordChanged = e => setPassword(e.target.value)

  const handleSubmit = e =>{
    e.preventDefault()
    userLogin({email,password})
      .then(result=>{
         if(result.error){
          setError(result.error)
         }
         else{
          authenticate(result,()=>{
            setError("")
            setSuccess(true)
            setEmail("")
            setPassword("")
            dispatch(onLogin())
          })
         }
    })
  }

  return (
      <React.Fragment>
      {isLoggedIn?(<Redirect to="/cart"/>):(

          <div className={classes.main}>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Login Page
        </Typography>
        {error.length>0 && (<Typography className={classes.error} gutterBottom>
          **{error}
        </Typography>)}
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
       <TextField 
         id="standard-basic" 
         label="Email" 
         type="email"  
         className={classes.textField} 
         required={true}
         value={email}
         onChange={handleEmailChanged}
       />
       <TextField 
         id="standard-basic" 
         label="Password" 
         type="password" 
         className={classes.textField} 
         required={true}
         value={password}
         onChange={handlePasswordChanged}
       />
        <Button style={{ backgroundColor: '#1976d2' }} size="small" className={classes.loginButton} variant="contained"  type="submit">Login</Button>
      </form>
      </CardContent>
      <CardActions>
       
        <p>New User? <Link to="/auth/signup" style={{textDecoration:"none",outline:"none"}}>Signup Here:</Link></p>
      </CardActions>

    </Card>
    </div>)}
      </React.Fragment>
  );
}