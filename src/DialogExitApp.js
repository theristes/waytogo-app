import  React , { useState } 
  from  'react';

import  { Dialog, DialogTitle, DialogActions, Button, IconButton}
  from  '@material-ui/core';

import  { ExitToAppOutlined }
  from  '@material-ui/icons';

function DialogExitApp({confirm}){
    const [open, setOpen] = useState(false);
    const handleConfirm = (fn,_open) => () => (fn(),setOpen(false));
    return  <div>
                <IconButton color="inherit" onClick={() => setOpen(true)}  aria-owns='fade-menu' aria-haspopup='true' aria-label="Menu">
                    <ExitToAppOutlined/>
                </IconButton>
                <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> {`Do you wanna exit the app?`} </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleConfirm(confirm,false)} color="primary">
                            Confirm
                        </Button>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
}

export { DialogExitApp }