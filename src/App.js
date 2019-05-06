import  React, { useState, useEffect } 
  from  'react';

import  pngLogo
  from  './assets/logo.png';

import  gifLoading
  from  './assets/loading.gif';

import  pngError
  from  './assets/error.png';

import  { AppBar, Toolbar, Menu, IconButton, List, Badge, ListItem, 
          ListItemText, ListItemAvatar, Avatar, Typography }
  from  '@material-ui/core';

import  { ExpandMore, Notifications }
  from  '@material-ui/icons';

import  { DialogAddCar, DialogEditCar, DialogDeleteCar,
         DialogServices, DialogEditPhotoCar, DialogEditCustomerCar }
  from  "./Dialogs";

import  { useCollection } 
  from  'react-firebase-hooks/firestore';

import  { updateCar, addCar, deleteCar, getNotificationsCount, getCarsColletion }
  from  './FirebaseService';

import  { PARAMS_CAR_ID, PARAMS_OIL_CHANGE, PARAMS_HAS_SERVICES }
  from  './AppUtils.js'

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

const   DialogNotifications = () => {
const [countNotifies, setCountNotifies] = useState(0); 
useEffect(() => {
  getNotificationsCount(setCountNotifies);
})
return  <div>
            <Badge color="inherit" aria-label="Notifications" badgeContent={countNotifies} color="secondary">
                <Notifications/>
            </Badge>
            
        </div>
}

const   CarOptions = ({item}) =>  {
const [anchorEl, setAnchorEl] = useState(null);
const [car] = useState(item)
const handleAnchor = e => setAnchorEl(e ? e.currentTarget : null);
return  <div>
          <IconButton aria-owns='fade-menu' aria-haspopup='true' onClick={handleAnchor} aria-label="More">
              <ExpandMore/>
          </IconButton>
          <Menu id="fade-menu" anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={() => handleAnchor(null)}>
              <DialogEditCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} menuVisible={true}/>
              <DialogEditPhotoCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} />
              <DialogEditCustomerCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} />
              <DialogServices closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)}  menuVisible={true}/>
              <DialogDeleteCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => deleteCar(car,console.log)} />
          </Menu>
        </div>;
}

const   Car = ({item}) => {
return  <ListItem alignItems="flex-start">
            <ListItemAvatar> 
                <Avatar alt="Car Sharp" src={item.photo}/>
            </ListItemAvatar>
            <ListItemText primary={item.make} secondary={
                <React.Fragment>
                    <Typography component="span" className="inline" color="textPrimary">{item.model} </Typography>
                    <strong>Plate: </strong>{item.licensePlate} <br/>
                    <strong>Customer: </strong> {item.customer ? item.customer.name : 'No customer'} <br/>
                    <strong>Year: </strong> {item.year} <br/>
                </React.Fragment>}/>
                
              {(item.id === PARAMS_CAR_ID && (PARAMS_OIL_CHANGE)) ? 
                  <DialogEditCar closeMenu={() => {}} item={item}  confirm={car => updateCar(car,console.log)}
                                menuVisible={false} />
                : <></> }

              {(item.id === PARAMS_CAR_ID && (PARAMS_HAS_SERVICES)) ? 
                  <DialogServices closeMenu={() => {}} item={item}  confirm={car => updateCar(car,console.log)}
                              menuVisible={false} />
                : <></> }
            <CarOptions item={item}></CarOptions>
      </ListItem>
}

 const  Cars = () => {
 const  { error, loading, value } = useCollection(getCarsColletion);
return  <div>
             { error && <Error errorMessage={''} errorImage={pngError}/> }
           { loading && <Loading loadingImage={gifLoading}/>  }
             { value && <List> 
                          { value.docs.map( car=><Car key={car.id} item={{id:car.id, ...car.data()}}/>) }  
                        </List> }
        </div>
}

 const  Main = (img, car = {}) => () => {
return  <div>
          <AppBar position="static">
            <Toolbar>
              <DialogAddCar confirm={car => addCar(car,console.log)}/>
              <img className='img-logo' src={img} alt='logo' />
              <DialogNotifications/>
            </Toolbar>
          </AppBar>
          <Cars></Cars>
        </div>
}

const   App = Main(pngLogo,{});

export  default App;
