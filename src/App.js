import  React, { useState } 
  from  'react';

import  pngLogo
  from  './assets/logo-plate.png';

import  gifLoading
  from  './assets/loading.gif';

import  pngError
  from  './assets/error.png';

import  { AppBar, Toolbar, Menu, IconButton, List, ListItem, 
          Card,
          ListItemText, ListItemAvatar, Avatar, Typography, TextField, Button }
  from  '@material-ui/core';

import  { ExpandMore }
  from  '@material-ui/icons';

import  { DialogAddCar, DialogEditCar, DialogDeleteCar, DialogNotifications,
         DialogServices, DialogEditPhotoCar, DialogEditCustomerCar }
  from  "./Dialogs";

import  { useCollection } 
  from  'react-firebase-hooks/firestore';

import  { updateCar, addCar, deleteCar, getCarsColletion }
  from  './FirebaseService';

import  { PARAMS_CAR_ID, PARAMS_OIL_CHANGE, PARAMS_HAS_SERVICES }
  from  './AppUtils'

import  './style.css';


const   Loading = ({loadingImage}) => 
        <div>
            <img className="img-loading" src={loadingImage} alt='loading'></img>
            <span className="loading-label">Loading...</span>
        </div>

const   Error = ({errorMessage, errorImage}) => 
        <div>
            <img className="img-error" src={errorImage} alt='loading'></img>
            <span className="error-label">Error {errorMessage}! </span>
        </div>

const   CarOptions = ({item}) =>  {
const [anchorEl, setAnchorEl] = useState(null);
const handleAnchor = e => setAnchorEl(e ? e.currentTarget : null);
return  <div>
          <IconButton aria-owns='fade-menu' aria-haspopup='true' onClick={handleAnchor} aria-label="More">
              <ExpandMore/>
          </IconButton>
          <Menu id="fade-menu" anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={() => handleAnchor(null)}>
              <DialogEditCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)} menuVisible={true}/>
              <DialogEditCustomerCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)} />
              <DialogServices closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)}  menuVisible={true}/>
              <DialogDeleteCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => deleteCar(car,console.log)} />
          </Menu>
        </div>;
}

const   Car = ({item}) => {
const [open, setOpen] = useState(false);

return  <Card className="car"> 
          <ListItem alignItems="flex-start">
              <ListItemAvatar> 
                  <Avatar alt="Car Sharp" src={item.photo} onClick={() => (setOpen(true))}/>                  
              </ListItemAvatar>
              <ListItemText primary={`${item.make} ${item.model}`} secondary={
                  <React.Fragment>
                      <Typography component="span" className="inline" color="textPrimary"> </Typography>
                      <strong>Plate: </strong>{item.licensePlate} <br/>
                      <strong>Customer: </strong> {item.customer ? item.customer.name : 'No customer'} <br/>
                      <strong>Year: </strong> {item.year} <br/>
                  </React.Fragment>}/>
                <DialogEditPhotoCar open={open} setOpen={setOpen}  item={item} confirm={car => updateCar(car,console.log)}/>
                 
                {(item.id === PARAMS_CAR_ID && (PARAMS_OIL_CHANGE)) ? 
                    <DialogEditCar item={item}  confirm={car => updateCar(car,console.log)} menuVisible={false} forceFocusOnDate={true} />
                  : <></> }

                {(item.id === PARAMS_CAR_ID && (PARAMS_HAS_SERVICES)) ? 
                    <DialogServices item={item}  confirm={car => updateCar(car,console.log)} menuVisible={false} />
                  : <></> }
              <CarOptions item={item}></CarOptions>
        </ListItem> 
      </Card>
}

const  Cars = () => {
 const  { error, loading, value } = useCollection(getCarsColletion);
return  <div>
             { error && <Error errorMessage={error} errorImage={pngError}/> }
           { loading && <Loading loadingImage={gifLoading}/>  }
             { value && <List> 
                          { value.docs.map( car=><Car key={car.id} item={{id:car.id, ...car.data()}}/>) } 
                        </List> }
        </div>
}

const  Login = (img) => {
  const [loginData,setLoginData] = useState(() => ({email:'', password:''}));
  const handleChange = value => event => setLoginData({ ...loginData, [value]: event.target.value });    
  return  <div>
            <AppBar>
              <Toolbar>
                <DialogAddCar confirm={car => addCar(car,console.log)}/>
                  <img src={img} className="img-logo" alt="logo"/>
              </Toolbar>
            </AppBar>
              <div className="login">
                <Card>
                  <TextField  label="Email"  onChange={handleChange('email')}
                                    margin="normal" variant="filled" fullWidth />
                  <TextField  label="Password" type="password" onChange={handleChange('password')}
                              margin="normal" variant="filled" fullWidth/>
                              
                  <Button  color="primary">
                      Login
                  </Button>
                  <Button color="secondary">
                      Cancel
                  </Button>

                </Card>
            </div>
          </div>
  }


const  Main = (img) => () => {
return  <div>
          <AppBar>
            <Toolbar>
              <DialogAddCar confirm={car => addCar(car,console.log)}/>
                <img src={img} className="img-logo" alt="logo"/>
              <DialogNotifications/>
            </Toolbar>
          </AppBar>
          <div className="main-cointainer">
            <Cars></Cars>
          </div>
        </div>
}

const   App = () => Login(pngLogo);

export  default App;
