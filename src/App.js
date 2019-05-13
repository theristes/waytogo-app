import  React from 'react';
import  { AppBar, Toolbar, Button } from '@material-ui/core';
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

function  App() {
  const { _, user } = useAuthState(auth);
   // audio.play();
 
  if (user) {
    return  (<div>
              <AppBar>
                <Toolbar>
                  <DialogExitApp confirm={() => auth.signOut()}/>
                  <img src={pngLogo} className="img-logo" alt="logo"/>
                  <DialogNotifications/>
                </Toolbar>
              </AppBar>
              <div className="main-cointainer">
                <Cars></Cars>
                <DialogAddCar confirm={car => addCar(car,console.log)}/>
              </div>
            </div>)
  }

  return  (<div>
            <AppBar>
              <Toolbar>
                <img src={pngLogo} className="img-logo" alt="logo" />
              </Toolbar>
            </AppBar>
            <Login/>
          </div>)
}

export default App;