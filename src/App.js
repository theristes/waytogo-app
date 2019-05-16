import  React, { useState } from 'react';
import  { AppBar, Toolbar, IconButton } from '@material-ui/core';
import  pngLogo from './assets/logo-plate.png';
import  Login from './Login';
import  { useAuthState } from 'react-firebase-hooks/auth';
import  { auth } from './Service';

import  './assets/style.css';
import  { DialogNotifications } from './DialogNotifications';
import  { Cars } from './CarList';
import  { DialogAddCar } from './DialogAddCar';
import  { addCar } from './Service';
import  { DialogExitApp } from './DialogExitApp';
import { VolumeOff, VolumeUp } from '@material-ui/icons';

function  App() {
  const [alarmOn, setAlarmOn] = useState(false);
  const handleVolume = () => alarmOn? setAlarmOn(false) : (setAlarmOn(true),document.getElementById('alarm').play());
  // eslint-disable-next-line
  const { _, user } = useAuthState(auth);
    if (user) {
    return  (<div>
              <AppBar>
                <Toolbar>
                  <DialogExitApp confirm={() => auth.signOut()}/>
                  <img src={pngLogo} className="img-logo" alt="logo"/>
                  <IconButton color="inherit" aria-label="Alarm" onClick={handleVolume}>
                    { alarmOn ? <VolumeUp/> : <VolumeOff/> }
                  </IconButton>
                  <DialogNotifications alarm={alarmOn} />
                </Toolbar>
              </AppBar>
              <div className="main-cointainer">
                <Cars></Cars>
                <DialogAddCar confirm={car => addCar(car,console.log)}/>
              </div>
            </div>)
  }

  return  ( 
            <div className="bg-login">
              <Login/>
            </div>)
}

export default App;