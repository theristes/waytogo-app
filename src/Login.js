import  React from  'react';
import { useState } from "react";
import { Card, CardContent, Typography, TextField, CardActions, Button } from "@material-ui/core";
import { authUser, createUser, forgotPassword } from './Service';
import { DialogAddUser } from './NewUser';
import { AlertMessage } from './AppUtils';
import logoPlate from './assets/logo-plate.png';

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [loginData,setLoginData] = useState(() => ({email:'', password:''}));
  const handleChange = value => event => setLoginData({ ...loginData, [value]: event.target.value });    
  const handleEnterButton = async(e) => { 
    const user = await authUser(loginData);
    if (user && user.id === -1) {
        setErrorMessage(user.message);
        console.log(user);
    } 
  };
  
  const handleForgotPasswordButton = async(e) => {
    if (loginData.email === '') {
        setErrorMessage(`The email field can't be blank`);
        return;
    }    
    const send = await forgotPassword(loginData.email);
    (send && send.id === -1) ? setErrorMessage(send.message) : setSuccessMessage(send.message);
  };
 
  return  (<div className="login-cointainer">
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        <img className="img-logo" src={logoPlate}/>
                      </Typography>
                      <TextField  label="Email" onChange={handleChange('email')}
                                        margin="dense" variant="filled" fullWidth />
                      <TextField  label="Password" type="password" onChange={handleChange('password')}
                                  margin="dense" variant="filled" fullWidth/>
                        <br/><br/>
                        <Button className="login-buttons" variant="contained" margin="dense" size="large" color="primary" onClick={handleEnterButton}>
                          Enter
                        </Button><br/><br/>
                        <Button className="login-buttons" variant="contained"  size="large" color="primary" onClick={ () => setOpenNewUser(true)}>
                          New User
                        </Button><br/><br/>
                        <Button className="login-buttons" color="secondary" size="small" onClick={handleForgotPasswordButton}>
                          Forgot Password?
                        </Button>
                    </CardContent>
                  </Card>
                  <DialogAddUser open={openNewUser} setOpen={setOpenNewUser} confirm={user => createUser(user) } />
                  <AlertMessage color="red" message={errorMessage} setMessage={setErrorMessage} ></AlertMessage>
                  <AlertMessage color="green" message={successMessage} setMessage={setSuccessMessage} ></AlertMessage>
              </div>)          
}

export default Login;