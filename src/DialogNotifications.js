import  React , { useState, useEffect } 
  from  'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Badge,
         List, Dialog, Typography, AppBar, Toolbar } from '@material-ui/core';
import { Notifications, Close } from '@material-ui/icons';
import { useCollection }   from  'react-firebase-hooks/firestore';
import { getNotificationColletion } from './Service';

function DialogNotifications({alarm}) {
    const [open, setOpen] = useState(false);
    const  { error,loading,value } = useCollection(getNotificationColletion);
    const [countNotifies, setCountNotifies] = useState(0);
    const handleToggleOpen = value => () => setOpen(value);
    const NotificationDetail = ({item}) => 
    (<ListItem alignItems="flex-start" button component="a" href={item.clickAction}>
            <ListItemAvatar> 
                <Avatar alt="Car Sharp" src={item.icon}/>
            </ListItemAvatar>
        <ListItemText primary={item.title} secondary={<React.Fragment>{item.body}</React.Fragment>}/>
    </ListItem>);
    
    useEffect(() => {
        value && setCountNotifies(value.docs.length);
        if (value && value.docs.length > 0) {            
            if (alarm) {
                let play = document.getElementById('alarm').play();
                if (play !== undefined) {
                    play.catch(error => {
                    }).then(() => {
                        console.log('Played');
                    });
                }
            }
        }
        return () => {
            setCountNotifies(0);
        }
    },[value,alarm])
    return  <div>
            <IconButton color="inherit" aria-label="Notifications" onClick={handleToggleOpen(true)}>
                <Badge badgeContent={countNotifies} color="secondary">
                    <Notifications/>
                </Badge>
            </IconButton>
            <Dialog fullScreen disableBackdropClick disableEscapeKeyDown open={open} onClose={handleToggleOpen(false)} aria-labelledby="form-dialog-title">
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h5" style={{flexGrow:1, color:'#FFFFFF'}}>
                                Notifications
                            </Typography>
                            <Close color="inherit" onClick={handleToggleOpen(false)}/>
                        </Toolbar>
                    </AppBar>
                    <div className='main-cointainer'>
                            { error && <b>Error</b> }
                            { loading }
                            { value &&  value.docs.length > 0  &&  <List> { ( value.docs.map( notification =>
                                                                            <NotificationDetail 
                                                                                key={notification.id} 
                                                                                item={{id:notification.id, ...notification.data()}
                                                                            }/> ) ) }
                                                                    </List> }
                            { value &&  value.docs.length === 0  &&  <Typography align="center" variant="h6" gutterBottom>No notifications to show</Typography> }
                    </div>
            </Dialog>
        </div>
}

export {DialogNotifications}