import  React , { useState } from  'react';
import  { Dialog, DialogTitle, DialogContent, TextField, InputAdornment, Button, DialogActions, Tooltip, Fab  } from '@material-ui/core';
import  { Add, CalendarToday } from '@material-ui/icons';

function DialogAddCar({confirm}) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({})
    const handleChange = value => event => setCar({ ...car, [value]: event.target.value });    
    const handleToggleOpen = value => () => setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car) => () => (fn(car),setOpen(false));
    return  <div>
                <div className="button-add">
                  <Tooltip title="Add a new car" aria-label="Add a new car">
                      <Fab color="primary" onClick={handleToggleOpen(true)}>
                          <Add/>
                      </Fab>
                  </Tooltip>
                </div>
                <Dialog fullScreen disableBackdropClick disableEscapeKeyDown open={open} onClose={handleToggleOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{borderBottom:'0.01rem solid'}}> Add a new car </DialogTitle>
                    <DialogContent>
                        <TextField  label="Make" onChange={handleChange('make')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth autoFocus/>
                        <TextField  label="Model" onChange={handleChange('model')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Color" onChange={handleChange('color')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="VIN" onChange={handleChange('vin')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Plate" onChange={handleChange('licensePlate')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth/>
                        <TextField  label="Year" onChange={handleChange('year')} style={{width:'100%'}} margin="normal" variant="filled" fullWidth/> <br/>
                        <TextField  label="The last oil changed" type="Date" style={{width:'96%'}} onChange={handleChange('dtLastOilChange')}
                                    margin="normal" variant="filled" fullWidth 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <CalendarToday />
                                        </InputAdornment>
                                        ),
                                    }}/> 
                    </DialogContent>
                    <DialogActions style={{padding:'1rem'}}>
                        <Button variant="contained" margin="auto" onClick={handleConfirm(confirm,car)} color="primary">Confirm</Button>
                        <Button variant="contained" margin="auto" onClick={handleToggleOpen(false)} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
}


export {DialogAddCar}