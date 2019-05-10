import  React , { useState } 
  from  'react';

import  { Dialog, DialogContent, TextField, DialogTitle,
          DialogActions, Button, MenuItem, 
          ListItemText, ListItemIcon, InputAdornment}
  from  '@material-ui/core';

import  { Person, CalendarToday, AttachMoney }
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
            <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> Customer </DialogTitle>
                <DialogContent>
                    <TextField  label="Address" value={customer.address} onChange={handleChange('address')}
                                margin="normal" variant="filled" fullWidth />
                    <TextField  label="Document" value={customer.document} onChange={handleChange('document')}
                                margin="normal" variant="filled" fullWidth/>
                    <TextField  label="Name" value={customer.name} onChange={handleChange('name')}
                                margin="normal" variant="filled" fullWidth/>
                    <TextField  label="When the lease begins" type="Date"  onChange={handleChange('beginDate')}
                                value={customer.beginDate} margin="normal" variant="filled" fullWidth 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <CalendarToday />
                                    </InputAdornment>
                                    ),
                                }}/> 
                    <TextField  label="When the lease ends" type="Date" onChange={handleChange('endDate')}
                                value={customer.endDate} margin="normal" variant="filled" fullWidth 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <CalendarToday />
                                    </InputAdornment>
                                    ),
                                }}/>
                    <TextField  label="Lease's value" onChange={handleChange('value')}
                                value={customer.value} onFocus={ () => customer.value === 0 ? setCustomer({...customer, value:''}) : null } 
                                margin="normal" variant="filled" fullWidth 
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><AttachMoney/></InputAdornment>)
                                }}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm(confirm,item,closeMenu)} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
}


export {DialogEditCustomerCar}