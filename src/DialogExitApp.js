import  React , { useState } 
  from  'react';

import  { Dialog, DialogActions, Button, IconButton, DialogContent, Typography}
  from  '@material-ui/core';

import  { ExitToAppOutlined }
  from  '@material-ui/icons';

function DialogExitApp({confirm}){
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line
    const handleConfirm = (fn,_open) => () => (fn(),setOpen(false));
    return  <div>
                <IconButton color="inherit" onClick={() => setOpen(true)}  aria-owns='fade-menu' aria-haspopup='true' aria-label="Menu">
                    <ExitToAppOutlined/>
                </IconButton>
                <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => setOpen(false)}  aria-labelledby="form-dialog-title">
                <DialogContent> 
                    <Typography align="center" variant="h6" gutterBottom> {`Confirm to log out`} </Typography>
                    <DialogActions>
                        <Button variant="raised" margin="auto" onClick={handleConfirm(confirm,false)} color="primary">Confirm</Button>
                        <Button variant="raised" margin="auto" onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            </div>
}

export { DialogExitApp }