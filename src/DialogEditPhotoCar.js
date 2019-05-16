
import  React , { useState } 
from  'react';

import  { Dialog, Card, CardMedia, Collapse, IconButton }
from  '@material-ui/core';


import  { imagesRef }
from  './Service';

import  { LOADING_PHOTO, ERROR_PHOTO }
from  './AppUtils';
import { Photo, Save, Edit, AddAPhoto } from '@material-ui/icons';


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
            <Card style={{backgroundColor:'#3f51b5'}} raised>         
                <CardMedia style={{height: 0, paddingTop: '80%'}} image={photo} title="Chang the pic"></CardMedia>
                <IconButton style={{color:"#ffffff"}} aria-label="Upload Image">
                    <label htmlFor="contained-button-file">
                        <AddAPhoto />
                    </label>
                </IconButton> 
                <Collapse>
                    <input className="input-file" accept="image/*" id="contained-button-file" style={{ position:'relative', visibility:'hidden'}} multiple type="file" onChange={handleChange}/>
                </Collapse>
            </Card>
            </Dialog>
        </div>
}


export {DialogEditPhotoCar}