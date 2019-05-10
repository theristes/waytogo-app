import  React , { useState, useRef } 
  from  'react';

import  { Dialog, DialogContent, TextField, DialogTitle,
          DialogActions, Button, MenuItem, 
          ListItemText, ListItemIcon, InputAdornment }
  from  '@material-ui/core';

import  { Edit, CalendarToday }
  from  '@material-ui/icons';


function DialogEditCar({closeMenu, item, confirm, menuVisible, forceFocusOnDate}) {
    const [open, setOpen] = useState(!menuVisible);
    const [car, setCar] = useState(item)
    const handleChange = value => event => setCar({ ...car, [value]: event.target.value });    
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car,closeBehind) => () => (fn(car), handleToggleOpen(false,closeBehind)());
    return  <div>
            { (menuVisible) ? 
                <MenuItem onClick={handleToggleOpen(true)}>
                    <ListItemIcon><Edit/></ListItemIcon>
                    <ListItemText inset primary="Edit Details"/>
                </MenuItem> 
                : <></> }
                <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> {`${car.make} ${car.model}`} </DialogTitle>
                    <DialogContent>
                        <TextField  label="Make" value={car.make} onChange={handleChange('make')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Model" value={car.model} onChange={handleChange('model')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Color" value={car.color} onChange={handleChange('color')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Vim" value={car.vim} onChange={handleChange('vim')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Plate" value={car.licensePlate} onChange={handleChange('licensePlate')} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Year" value={car.year} onChange={handleChange('year')} margin="normal" variant="filled" fullWidth/> <br/>
                        <TextField  label="The last oil changed" type="Date" onChange={handleChange('dtLastOilChange')} value={car.dtLastOilChange}
                                    autoFocus={forceFocusOnDate} margin="normal" variant="filled" fullWidth 
                                    InputProps={{ startAdornment: (<InputAdornment position="start"> <CalendarToday /> </InputAdornment>) }}/> 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirm(confirm,car,closeMenu)} color="primary">Confirm</Button>
                        <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
}

export {DialogEditCar}