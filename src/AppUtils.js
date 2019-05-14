import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

/* THOSE ARE KEYS */
export const NO_PHOTO = `https://firebasestorage.googleapis.com/v0/b/waytogoautolease.appspot.com/o/no-image-icon-4.png?alt=media&token=e4a9f2b2-4fe0-4f0b-ae19-0d06c511750c`;
export const LOADING_PHOTO = `https://firebasestorage.googleapis.com/v0/b/waytogoautolease.appspot.com/o/loading.gif?alt=media&token=6a152b95-8202-45bb-98b2-cf6b6c464b8c`;
export const ERROR_PHOTO = `https://firebasestorage.googleapis.com/v0/b/waytogoautolease.appspot.com/o/error.png?alt=media&token=b8c0affa-ee99-4038-8da5-f1681d9d0a0a`;
export const MESSAGE_INSERT = `You've successfully inserted your data`; 
export const MESSAGE_UPDATE = `You've successfully updated your data`; 
export const MESSAGE_DELETE = `You've successfully removed your data`; 
export const PARAMS_CAR_ID = new URLSearchParams(window.location.search).get('carId');
export const PARAMS_OIL_CHANGE = new URLSearchParams(window.location.search).get('oilChange');
export const PARAMS_HAS_SERVICES = new URLSearchParams(window.location.search).get('hasService');




/* THOSE ARE FUNCTION */
// eslint-disable-next-line
export const CLEAN_OBJECT = obj => Object.keys(obj).reduce((p, c) => (obj[c]? p[c] = obj[c] : null, p), {});

export const RANDOM_KEY = type => 
    'x'.padEnd(type,'x').replace(/[xy]/g, (c) => 
    (c === 'x' ? 
        ( (Math.floor(new Date().getTime()/16) + Math.random()*16) % 16  | 0 ) :
        ( ( (Math.floor(new Date().getTime()/16) + Math.random()*16)% 16 | 0 ) & ( 0x3 | 0x8 ) ) )
    .toString(16));


/* THOSE ARE HOOKS */
export const AlertMessage = ({color, message, setMessage}) => 
    (<Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
            open={Boolean(message) } autoHideDuration={6000} 
            onClose={() => setMessage(null)}>
        <SnackbarContent 
            style={{backgroundColor: color}}
            contentprops={{'aria-describedby': 'message-id',}}
            onClose={() => setMessage(null)}
            message={message} 
            action={[<IconButton key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => setMessage(null)}>
                                <Close/> 
                    </IconButton>]}>
        </SnackbarContent>      
    </Snackbar>)
