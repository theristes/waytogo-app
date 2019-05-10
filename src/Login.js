import  React from  'react';
import { useState } from "react";
import { Card, CardContent, Typography, TextField, CardActions, Button } from "@material-ui/core";
import { authUser, createUser, forgotPassword } from './Service';
import { DialogAddUser } from './NewUser';
import { AlertMessage } from './AppUtils';

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [loginData,setLoginData] = useState(() => ({email:'', password:''}));
  const handleChange = value => event => setLoginData({ ...loginData, [value]: event.target.value });    
  const handleEnterButton = async(e) => { 
        const user = await authUser(loginData);
        debugger;
        if (user && user.id === -1) {
            setErrorMessage(user.message);
            console.log(user);
        } else if (user) {
          console.log(user);
        } else {
            localStorage.setItem('uid',user.id);
            window.location.href = '/';
        }
  };
  
  const handleForgotPasswordButton = async(e) => {
    if (loginData.email === '') {
        setErrorMessage(`The email field can't be blank`);
        return;
    }    
    const send = await forgotPassword(loginData.email);
    send ? setErrorMessage(send) : setSuccessMessage(`The reset password's link was sent to the email`);
  };

  return  (<div className="main-cointainer">
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Login
                      </Typography>
                      <TextField  label="Email" onChange={handleChange('email')}
                                        margin="dense" variant="filled" fullWidth />
                      <TextField  label="Password" type="password" onChange={handleChange('password')}
                                  margin="dense" variant="filled" fullWidth/>
                      <CardActions>
                        <Button variant="contained" size="small" color="primary" onClick={handleEnterButton}>
                          Enter
                        </Button>
                        <Button variant="contained" size="small" color="primary" onClick={ () => setOpenNewUser(true)}>
                          New User
                        </Button>
                        <Button color="secondary" size="small" onClick={handleForgotPasswordButton}>
                          Forgot Password?
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                  <DialogAddUser open={openNewUser} setOpen={setOpenNewUser} confirm={user => createUser(user) } />
                  <AlertMessage color="red" message={errorMessage} setMessage={setErrorMessage} ></AlertMessage>
                  <AlertMessage color="green" message={successMessage} setMessage={setSuccessMessage} ></AlertMessage>
              </div>)          
}

export default Login;