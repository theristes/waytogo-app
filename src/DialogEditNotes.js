import  React , { useState } 
  from  'react';

import  { Dialog, DialogContent, TextField, MenuItem, 
          ListItemText, ListItemIcon }
  from  '@material-ui/core';

import  { Note }
  from  '@material-ui/icons';


function DialogEditNotes({closeMenu, item, confirm}){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState(item)
    const handleChange = value => event => setCar({ ...car, [value]: event.target.value ? event.target.value : ' ' });  
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car,closeBehind) => () => (fn(car), handleToggleOpen(false,closeBehind)());
    return  <div>
            <MenuItem onClick={handleToggleOpen(true)}>
                <ListItemIcon><Note/></ListItemIcon>
                <ListItemText inset primary="Notes"/>
            </MenuItem>
            <Dialog onClose={handleConfirm(confirm,car,closeMenu)} open={open} aria-labelledby="form-dialog-title">
                <DialogContent style={{padding:'1rem'}}>
                    <TextField label="Type your notes here..." value={car.notes} style={{width:'100%'}} onChange={handleChange('notes')} 
                        margin="normal" variant="filled" multiline  fullWidth autoFocus/>
                </DialogContent>
            </Dialog>
        </div>
}

export {DialogEditNotes}