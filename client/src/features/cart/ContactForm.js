import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {addNewOrder} from '../../app/helper/index'
import {removeAllItemsFromCartAction} from './cartSlice'
import {useDispatch} from 'react-redux'

export default function ContactForm({open,setOpen,userId}) {
  const dispatch = useDispatch()
  
  const [mobileNumber,setMobileNumber] = useState("")
  const [address,setAddress] = useState("")

  const handleMobileNumberChanged = e => setMobileNumber(e.target.value)
  const handleAddressChanged = e => setAddress(e.target.value)

  // console.log("Products at Dialog box::",products)

  const handleClose = () => {
    setOpen(false);
  };
  const handleOrder = ()=>{
    // console.log("Address",address)
    // console.log("Mobile",mobileNumber)
    const contact={
      phoneNumber:mobileNumber,
      address
    }
    const data = {
      userId:userId,
      contact
    }
    // console.log("data",data)
    addNewOrder(data).then(result=>{
      // console.log("result at fina;",result)
      setAddress("")
      setMobileNumber("")
      dispatch(removeAllItemsFromCartAction(userId))
      setOpen(false)
    }).catch(err=>console.log(err))
    
  }



  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Contact Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add your conatct number and Address so that we can deliver your product to you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mobileNumber"
            label="Mobile Number"
            fullWidth
            value={mobileNumber}
            onChange={handleMobileNumberChanged}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            value={address}
            onChange={handleAddressChanged}
            required
          />
        </DialogContent>
        <DialogActions>
         
          <Button  color="primary" onClick={handleClose}>
            Cancel
          </Button>
          
          <Button onClick={handleOrder} color="primary">
            Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
