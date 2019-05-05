import  React, { useState } 
  from  'react';

import  logo 
  from  './assets/logo.png'

import  { AppBar, Toolbar, Menu, IconButton, List, ListItem,
        ListItemText, ListItemAvatar, Avatar, Typography } 
  from  '@material-ui/core';

import  { ExpandMore }
  from  '@material-ui/icons';

import  { DialogAddCar, DialogEditCar, DialogDeleteCar,
         DialogServices, DialogEditPhotoCar, DialogEditCustomerCar }
  from  "./Dialogs";

import  { useCollection } 
  from  'react-firebase-hooks/firestore';

import { updateCar, addCar, deleteCar, getCarsColletion }
from './FirebaseService';

import  { PARAMS_CAR_ID, PARAMS_OIL_CHANGE, PARAMS_HAS_SERVICES }
  from  './AppUtils.js'

import './style.css';

const CarOptions = ({item}) =>  {
const [anchorEl, setAnchorEl] = useState(null);
const [car] = useState(item)
const handleAnchor = e => setAnchorEl(e ? e.currentTarget : null);
return  <div>
            <IconButton aria-owns='fade-menu' aria-haspopup='true' onClick={handleAnchor} aria-label="More">
              <ExpandMore/>
          </IconButton>
            <Menu id="fade-menu" anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={() => handleAnchor(null)}>
              <DialogEditCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} menuVisible={true} />
              <DialogEditPhotoCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} />
              <DialogEditCustomerCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} />
              <DialogServices closeMenu={() => handleAnchor(null)} item={car} confirm={car => updateCar(car,console.log)} />
              <DialogDeleteCar closeMenu={() => handleAnchor(null)} item={car} confirm={car => deleteCar(car,console.log)} />
          </Menu>
        </div>;
}

const Car = ({item}) => {
return  <ListItem alignItems="flex-start">
            <ListItemAvatar> 
                <Avatar alt="Car Sharp" src={item.photo}/>
            </ListItemAvatar>
            <ListItemText primary={item.make} secondary={
                <React.Fragment>
                    <Typography component="span" className="inline" color="textPrimary">{item.model} </Typography>
                    <strong>Plate: </strong>{item.licensePlate} <br/>
                    <strong>Customer: </strong> name <br/>
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

const Cars = () => {
const { error, loading, value } = useCollection(getCarsColletion);
return  <div>
            {error && <strong>Error: {error}</strong>}
          {loading && <span>Loading...</span>}
            {value && <List> 
                          { value.docs.map( car=><Car key={car.id} item={{id:car.id, ...car.data()}}/>) }  

                      </List>}
        </div>
}

const Main = (img, car = {}) => () => {
  return  <div>
          <AppBar position="static">
          <Toolbar>
            <DialogAddCar confirm={car => addCar(car,console.log)}/>
              <img className='img-logo' src={img} alt='logo' />
            </Toolbar>
          </AppBar>
          <Cars></Cars>
    </div>
}

const App = Main(logo,{});

export default App;
