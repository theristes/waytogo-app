
import  React , { useState } 
from  'react';

import  { Dialog, DialogContent, DialogTitle, DialogActions, Button }
from  '@material-ui/core';


import  { imagesRef }
from  './Service';

import  { LOADING_PHOTO, ERROR_PHOTO }
from  './AppUtils';


function DialogEditPhotoCar({closeMenu, item, open, setOpen, confirm}){
    const [car] = useState(item);
    const [photo, setPhoto] = useState(item.photo);
    const handleToggleOpen = (value,closeBehind) => () => ((!value) && (closeBehind)) ? (closeBehind(), setOpen(value)) : setOpen(value);
    const handleChange = (e) => {
        const file = e.target.files[0];
        const uploadTask = imagesRef(item.id).put(file);
        uploadTask.on('state_changed',
        () => setPhoto(LOADING_PHOTO), // LOADING 
        // eslint-disable-next-line
        (error) => (setPhoto(ERROR_PHOTO), console.log(`An error: ${error}`)), // ERROR
        async() => {
            const downloadFile = await uploadTask.snapshot.ref.getDownloadURL();
            let toUpdate = { ...car, photo: downloadFile };
            setPhoto(downloadFile);
            confirm(toUpdate);
        });
    }
    return  <div>
            <Dialog open={open} onClose={handleToggleOpen(false,closeMenu)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Photo</DialogTitle>
                <DialogContent>
                    <img className='img-car' src={photo} alt={`${car.make} ${car.model}`} />
                    <input className="input-file" accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                <label htmlFor="contained-button-file">
                    <Button color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <Button onClick={handleToggleOpen(false,closeMenu)} color="secondary">
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        </div>
}

export {DialogEditPhotoCar}