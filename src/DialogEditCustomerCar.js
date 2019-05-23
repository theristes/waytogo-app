import  React , { useState } 
  from  'react';

import  { Dialog, DialogContent, TextField, DialogTitle,
          DialogActions, Button, MenuItem, 
          ListItemText, ListItemIcon, InputAdornment}
  from  '@material-ui/core';

import  { Person, CalendarToday }
  from  '@material-ui/icons';



function DialogEditCustomerCar({closeMenu, item, confirm}){
    const emptyCustomer = { address: '', document: '', name: '', beginDate: '', endDate: '', value : 0};
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState( () => item.customer ||  emptyCustomer )
    const handleChange = value => event => setCustomer({ ...customer, [value]: event.target.value });    
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car,closeBehind) => () => ( fn({...car, customer:customer}), handleToggleOpen(false,closeBehind)());
    return  <div>
            <MenuItem onClick={handleToggleOpen(true)}>
                <ListItemIcon><Person/></ListItemIcon>
                <ListItemText inset primary="Customer"/>
            </MenuItem>
            <Dialog fullScreen disableBackdropClick disableEscapeKeyDown open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{borderBottom:'0.01rem solid'}}> Customer </DialogTitle>
                <DialogContent>
                    <TextField  label="Address" value={customer.address} style={{width:'100%'}} onChange={handleChange('address')}
                                margin="normal" variant="filled" fullWidth autoFocus/>
                    <TextField  label="Document" value={customer.document} style={{width:'100%'}} onChange={handleChange('document')}
                                margin="normal" variant="filled" fullWidth/>
                    <TextField  label="Name" value={customer.name} style={{width:'100%'}} onChange={handleChange('name')}
                                margin="normal" variant="filled" fullWidth/>
                    <TextField  label="When the lease begins" type="Date"  style={{width:'96%'}} onChange={handleChange('beginDate')}
                                value={customer.beginDate} margin="normal" variant="filled" fullWidth 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <CalendarToday />
                                    </InputAdornment>
                                    ),
                                }}/> 
                    <TextField  label="When the lease ends" type="Date" style={{width:'96%'}} onChange={handleChange('endDate')}
                                value={customer.endDate} margin="normal" variant="filled" fullWidth 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <CalendarToday />
                                    </InputAdornment>
                                    ),
                                }}/>
                </DialogContent>
                <DialogActions style={{padding:'1rem'}}>
                        <Button variant="contained" margin="auto" onClick={handleConfirm(confirm,item,closeMenu)} color="primary">Confirm</Button>
                        <Button variant="contained" margin="auto" onClick={handleToggleOpen(false,closeMenu)} color="secondary">Cancel</Button>
                    </DialogActions>
            </Dialog>
        </div>
}

export {DialogEditCustomerCar}