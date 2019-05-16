import  React , { useState } 
  from  'react';

import  { Dialog, DialogTitle, DialogActions, Button, MenuItem, ListItemText, ListItemIcon, DialogContent, Typography }
  from  '@material-ui/core';

import  { Delete }
  from  '@material-ui/icons';

function DialogDeleteCar({closeMenu, item, confirm}){
    const [open, setOpen] = useState(false);
    const [car] = useState(item);
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car,closeBehind) => () => (fn(car),handleToggleOpen(false,closeBehind)());
    return  <div>
            <MenuItem onClick={handleToggleOpen(true)}>
                <ListItemIcon><Delete/></ListItemIcon>
                <ListItemText inset primary="Delete"/>
            </MenuItem>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                <DialogContent> 
                    <Typography align="center" variant="h6" gutterBottom> {`Are you sure about delete the ${car.make} ${car.model}?`} </Typography>
                </DialogContent>
                <DialogActions style={{padding:'1rem'}}>
                        <Button variant="raised" margin="auto" onClick={handleConfirm(confirm,car,closeMenu)} color="primary">Confirm</Button>
                        <Button variant="raised" margin="auto" onClick={handleToggleOpen(false,closeMenu)} color="secondary">Cancel</Button>
                    </DialogActions>
            </Dialog>
        </div>
}

export { DialogDeleteCar }