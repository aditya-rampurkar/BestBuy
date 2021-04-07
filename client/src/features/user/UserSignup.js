import React,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {userSignup} from '../../app/helper/index'

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
  signupButton:{
  	color:"white",
    marginTop: "20px",
    marginRight: "auto"
  },
  textField:{
  	marginRight:"30px"
  },
  error:{
    color:"red"
  }
});

export default function UserSignup() {
  const classes = useStyles();
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState(false)

  const handleFirstNameChanged = e => setFirstName(e.target.value)
  const handleLastNameChanged = e => setLastName(e.target.value)
  const handleEmailChanged = e => setEmail(e.target.value)
  const handlePasswordChanged = e => setPassword(e.target.value)


  const handleSubmit = (e)=>{
      e.preventDefault()

      userSignup({firstName,lastName,email,password})
            .then((result)=>{
              if(result.error){
                setError(result.error)

              }
              else{
                // console.log("result",result)
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setError("")
                setSuccess(true)
              }
            })
  }
  return (
      <React.Fragment>
        {success?(<Redirect to="/auth/login"/>):(

             <div className={classes.main}>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Signup Page
        </Typography>
        {error.length>0 && (<Typography className={classes.error} gutterBottom>
          **{error}
        </Typography>) }
        <form className={classes.root}  autoComplete="off" onSubmit={handleSubmit}>
       <TextField 
         id="outlined-basic" 
         label="FirstName"  
         className={classes.textField} 
         required={true} 
         value={firstName} 
         onChange={handleFirstNameChanged}
       />
       <TextField 
         id="standard-basic" 
         label="LastName"  
         className={classes.textField} 
         required={true}
         value={lastName}
         onChange={handleLastNameChanged}
       />
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
       <Button 
         style={{ backgroundColor: '#1976d2' }}
         size="small" 
         className={classes.signupButton} 
         type="submit">Signup</Button>
      </form>
      </CardContent>
      <CardActions>
        <p>Already have an Account? <Link to="/auth/login" style={{textDecoration:"none",outline:"none"}}>Login Here:</Link></p>
      </CardActions>

    </Card>
    </div>
          )}
      </React.Fragment>
  );
}