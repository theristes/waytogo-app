import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { AlertMessage } from "./AppUtils";

const DialogAddUser = ({open, setOpen, confirm}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState({})
    const handleChange = value => event => setUser({ ...user, [value]: event.target.value });    
    const handleToggleOpen = value => () => setOpen(value);
    // eslint-disable-next-line
    const handleConfirm = (fn,user) => () => {
        if (user.password !== user.confirmPassword) {
            setErrorMessage(`The password's fields must have the same value each`)
            return
        }
        fn({email:user.email,password:user.password});
        setOpen(false)
    };
    return <div>
              <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleToggleOpen(false)} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title"> New User </DialogTitle>
                  <DialogContent>
                      <TextField label="Email Address" onChange={handleChange('email')}
                      margin="normal" variant="filled" fullWidth />
                      <TextField label="Choose password" type="password" onChange={handleChange('password')}
                      margin="normal" variant="filled" fullWidth/>
                      <TextField  label="Confirm password" type="password" onChange={handleChange('confirmPassword')}
                      margin="normal" variant="filled" fullWidth/>
                    <AlertMessage color="red" message={errorMessage} setMessage={setErrorMessage} ></AlertMessage>
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" onClick={handleConfirm(confirm,user)} color="primary">
                          Confirm
                      </Button>
                      <Button variant="contained" onClick={handleToggleOpen(false)} color="secondary">
                          Cancel
                      </Button>
                  </DialogActions>
              </Dialog>
            </div>
}

export {DialogAddUser}