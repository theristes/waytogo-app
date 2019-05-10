import  React , { useState } 
  from  'react';
import { MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, Button, DialogActions } from '@material-ui/core';
import { NoteAdd, CalendarToday } from '@material-ui/icons';


function DialogAddCar({confirm}) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({})
    const handleChange = value => event => setCar({ ...car, [value]: event.target.value });    
    const handleToggleOpen = value => () => setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car) => () => (fn(car),setOpen(false));
    return  <div>
                <MenuItem onClick={handleToggleOpen(true)}>
                    <ListItemIcon><NoteAdd/></ListItemIcon>
                    <ListItemText inset primary="New Car"/>
                </MenuItem> 
                <Dialog open={open} onClose={handleToggleOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> New Car </DialogTitle>
                    <DialogContent>
                        <TextField  label="Make" onChange={handleChange('make')} margin="normal" variant="filled" fullWidth />
                        <TextField  label="Model" onChange={handleChange('model')}  margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Color" onChange={handleChange('color')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Vim" onChange={handleChange('vim')}  margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Plate" onChange={handleChange('licensePlate')}  margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Year" onChange={handleChange('year')} margin="normal" variant="filled" fullWidth/> <br/>
                        <TextField  label="The last oil changed" type="Date" onChange={handleChange('dtLastOilChange')}
                                    margin="normal" variant="filled" fullWidth 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <CalendarToday />
                                        </InputAdornment>
                                        ),
                                    }}/> 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirm(confirm,car)} color="primary">Confirm</Button>
                        <Button onClick={handleToggleOpen(false)} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
}


export {DialogAddCar}