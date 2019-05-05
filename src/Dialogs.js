import  React , { useState, useRef } 
  from  'react';

import  { Dialog, DialogContent, TextField, DialogTitle,
          DialogActions, Button, MenuItem,Checkbox, 
          ListItemText, ListItemIcon, InputAdornment, List,
          ListItem, ListItemSecondaryAction, IconButton }
  from  '@material-ui/core';

import  { Add, Edit, Delete, Build, Person,
          Photo,  CalendarToday, AttachMoney }
  from  '@material-ui/icons';

import  { imagesRef }
  from  './FirebaseService';

import  { LOADING_PHOTO, RANDOM_KEY }
  from  './AppUtils';

const DialogAddCar = ({confirm}) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({})
    const handleChange = value => event => setCar({ ...car, [value]: event.target.value });    
    const handleToggleOpen = value => () => setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,car) => () => (fn(car),setOpen(false));
    return <div>
              <IconButton color="inherit" aria-label="Menu" onClick={handleToggleOpen(true)}>
                <Add/>
              </IconButton>
              <Dialog open={open} onClose={handleToggleOpen(false)} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title"> New Car </DialogTitle>
                  <DialogContent>
                      <TextField label="Make" onChange={handleChange('make')}
                      margin="normal" variant="filled" fullWidth />
                      <TextField label="Model" onChange={handleChange('model')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Color" onChange={handleChange('color')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Vim" onChange={handleChange('vim')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Plate" onChange={handleChange('licensePlate')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Year" onChange={handleChange('year')}
                      margin="normal" variant="filled" fullWidth/> <br/>
                      <TextField  label="The last oil changed" type="Date" 
                      onChange={handleChange('dtLastOilChange')}
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
                      <Button onClick={handleConfirm(confirm,car)} color="primary">
                          Confirm
                      </Button>
                      <Button onClick={handleToggleOpen(false)} color="secondary">
                          Cancel
                      </Button>
                  </DialogActions>
              </Dialog>
            </div>
}

const DialogEditCar = ({closeMenu, item, confirm, menuVisible}) => {
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
                      <TextField label="Make" value={car.make} onChange={handleChange('make')}
                      margin="normal" variant="filled" fullWidth />
                      <TextField label="Model" value={car.model} onChange={handleChange('model')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Color" value={car.color} onChange={handleChange('color')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Vim" value={car.vim} onChange={handleChange('vim')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Plate" value={car.licensePlate} onChange={handleChange('licensePlate')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField label="Year" value={car.year} onChange={handleChange('year')}
                      margin="normal" variant="filled" fullWidth/> <br/>
                      <TextField  label="The last oil changed" type="Date" 
                      onChange={handleChange('dtLastOilChange')}
                      value={car.dtLastOilChange}
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
                    <Button onClick={handleConfirm(confirm,car,closeMenu)} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
}

const DialogDeleteCar = ({closeMenu, item, confirm}) => {
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
            <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> {`Are you sure about delete the ${car.make} ${car.model}?`} </DialogTitle>
                <DialogActions>
                    <Button onClick={handleConfirm(confirm,car,closeMenu)} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
}

const DialogEditPhotoCar = ({closeMenu, item, confirm}) => {
    const [open, setOpen] = useState(false);
    const [car] = useState(item);
    const [photo, setPhoto] = useState(item.photo);
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    const handleChange = (e) => {
        const file = e.target.files[0];
        const uploadTask = imagesRef(item.id).put(file);
        uploadTask.on('state_changed', () => setPhoto(LOADING_PHOTO) , (error) => {
            console.log(`An error just happened: ${error}`)
        }, async() => {
          const downloadFile = await uploadTask.snapshot.ref.getDownloadURL();
          let toUpdate = { ...car, photo: downloadFile };
          setPhoto(downloadFile);
          confirm(toUpdate);
        });
    }
    return  <div>
            <MenuItem onClick={handleToggleOpen(true)}>
                <ListItemIcon><Photo/></ListItemIcon>
                <ListItemText inset primary="Photo"/>
            </MenuItem>
            <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Photo</DialogTitle>
                <DialogContent>
                    <img className='img-car' src={photo} alt={`${car.make} ${car.model}`} />
                    <input className="input-file" accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                <label htmlFor="contained-button-file">
                    <Button color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        </div>
}

const DialogServices = ({closeMenu, item, confirm, menuVisible}) => {
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

const DialogEditCustomerCar = ({closeMenu, item, confirm}) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(item.customer || { address: '', document: '', name: '', beginDate: '', endDate: '', value : 0} )
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

export { DialogAddCar, DialogEditCar, DialogEditCustomerCar,
         DialogServices, DialogDeleteCar, DialogEditPhotoCar }