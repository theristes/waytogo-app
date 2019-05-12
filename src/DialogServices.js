import  React , { useState, useRef } 
  from  'react';

import  { Dialog, DialogContent, TextField, DialogTitle,
          DialogActions, Button, MenuItem, Checkbox,
          ListItemText, ListItemIcon, InputAdornment, List,
          ListItem, ListItemSecondaryAction, IconButton }
  from  '@material-ui/core';

import  { Add, Delete, Build }
  from  '@material-ui/icons';

import  {RANDOM_KEY }
  from  './AppUtils';


function DialogServices({closeMenu, item, confirm, menuVisible}) {
    const [open, setOpen] = useState(!menuVisible);
    const [valueText, setValueText] = useState('');
    const [services, setServices] = useState(item.services || []);
    const textField = useRef({});

    const handleChange = event => {
        if ((event.target.value) && (event.target.value.trim().length > 0)) { 
            setValueText( event.target.value)
        }
    };

    const handleClickAdd = (event) => {
        if (valueText.trim().length > 0) {
            services.push({ index: RANDOM_KEY(6), description:valueText, done:false });
            setServices(services);
            setValueText('');
            textField.current.focus();
        }
    };
    const handleCheck = service => {
        services.map( (s => { if (s === service) { s.done = !s.done; } return s }));
        setServices(services);
        textField.current.focus();
    };

    const deleteService = index =>  {
        let _services = services.filter( s => { return s.index !== index});
        setServices(_services);
        textField.current.focus();
    };

    // eslint-disable-next-line
    const handleConfirm = (fn,car,closeBehind) => () => (fn({...car, services:services}), handleToggleOpen(false,closeBehind)());
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    return  <div>
                { (menuVisible) ? 
                    <MenuItem onClick={handleToggleOpen(true)}>
                        <ListItemIcon><Build/></ListItemIcon>
                        <ListItemText inset primary="Services"/>
                    </MenuItem>
                : <></> }

                <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{`Services \n ${item.make} ${item.model} ${item.licensePlate}`} </DialogTitle>
                    <DialogContent>
                        <TextField  label="Add a service" value={valueText}  onChange={handleChange}
                                    margin="normal" variant="filled" inputRef={textField} 
                                    autoFocus  fullWidth
                                    InputProps={{endAdornment: 
                                                    (<InputAdornment position="end" onClick={handleClickAdd}><Add/></InputAdornment>)
                                                }}/> 
                        <List>
                            { services.map((service) => (
                                <ListItem key={service.index} dense button>
                                    <Checkbox tabIndex={-1} checked={service.done} onClick={() => handleCheck(service)} disableRipple/>
                                    <ListItemText primary={service.description} />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete" onClick={ () => deleteService(service.index) }>
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                            </ListItem> )) }
                        </List>
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

export {DialogServices}