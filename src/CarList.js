import  React, { useState, useEffect, useRef }  from  'react';
import  gifLoading from  './assets/loading.gif';
import  pngError  from  './assets/error.png';
import  { Menu, IconButton, List, ListItem, Card, ListItemText, ListItemAvatar, Avatar, Typography, Tooltip, Fade }  from  '@material-ui/core';
import  { ExpandMore, Note }  from  '@material-ui/icons';
import  { useCollection }   from  'react-firebase-hooks/firestore';
import  { updateCar, deleteCar, getCarsColletion }  from  './Service';
import  { PARAMS_CAR_ID, PARAMS_OIL_CHANGE, PARAMS_HAS_SERVICES }  from  './AppUtils';
import  { DialogEditCar } from './DialogEditCar';
import  { DialogEditCustomerCar } from './DialogEditCustomerCar';
import  { DialogServices } from './DialogServices';
import  { DialogDeleteCar } from './DialogDeleteCar';
import  { DialogEditPhotoCar } from './DialogEditPhotoCar';
import  { DialogEditNotes } from './DialogEditNotes';
import  { Error } from './Error';
import  { Loading } from './Loading';

function CarOptions({item}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleAnchor = e => setAnchorEl(e ? e.currentTarget : null);
    return  <div>
              <IconButton aria-owns='fade-menu' aria-haspopup='true' onClick={handleAnchor} aria-label="More">
                  <ExpandMore/>
              </IconButton>
              <Menu id="fade-menu" anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={() => handleAnchor(null)}>
                  <DialogEditCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)} menuVisible/>
                  <DialogEditCustomerCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)} />
                  <DialogEditNotes closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)}/>
                  <DialogServices closeMenu={() => handleAnchor(null)} item={item} confirm={car => updateCar(car,console.log)}  menuVisible/>
                  <DialogDeleteCar closeMenu={() => handleAnchor(null)} item={item} confirm={car => deleteCar(car,console.log)} />
              </Menu>
            </div>;
}
    
function Car({item}) {
    const [blink, setBlink] = useState(true);
    const [tooltipOpen, setToolTipOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const handleToolTip = async() => {setToolTipOpen(true); await (new Promise(resolve => setTimeout(resolve, 3000))); setToolTipOpen(false); }
    useInterval(() => {
        const foundService = item.services && item.services.some(s => !s.done);
        foundService ?  setBlink(!blink) : setBlink(true)
      }, 500);

    return  <Fade in={blink}>     
                <Card style={{marginBottom:'0.5rem'}} raised> 
                <ListItem alignItems="flex-start">
                    <ListItemAvatar> 
                        <Avatar alt="Car Sharp" src={item.photo} onClick={() => (setOpen(true))}/>                  
                    </ListItemAvatar>
                    <ListItemText primary={`${item.make} ${item.model}`} secondary={
                        <React.Fragment>
                            <Typography component="span" className="inline" color="textPrimary"> </Typography>
                            <strong>Plate: </strong>{item.licensePlate} <br/>
                            <strong>Customer: </strong> {item.customer ? item.customer.name : 'No customer'} <br/>
                            <strong>Year: </strong> {item.year} <br/>
                        </React.Fragment>}/>
                        <DialogEditPhotoCar open={open} setOpen={setOpen}  item={item} confirm={car => updateCar(car,console.log)}/>
                        
                        {(item.id === PARAMS_CAR_ID && (PARAMS_OIL_CHANGE)) ? 
                            <DialogEditCar item={item}  confirm={car => updateCar(car,console.log)} menuVisible={false} forceFocusOnDate/>
                        : <></> }
        
                        {(item.id === PARAMS_CAR_ID && (PARAMS_HAS_SERVICES)) ? 
                            <DialogServices item={item}  confirm={car => updateCar(car,console.log)} menuVisible={false} />
                        : <></>}

                        {(item.notes && (item.notes.trim().length > 0))  ?
                            <IconButton onClick={handleToolTip}> 
                                <Tooltip open={tooltipOpen} title={item.notes} aria-label={item.notes}>
                                    <Note color="secondary"/> 
                                </Tooltip>
                            </IconButton> 
                            : <></>}
                        {(item.services && (item.services.length > 0))  ?
                            <DialogServices item={item} confirm={car => updateCar(car,console.log)} menuVisible smallIcon/>
                        : <></>}

                    <CarOptions item={item}></CarOptions>
                </ListItem> 
            </Card>
        </Fade>
}
    
function Cars(){
    const  { error, loading, value } = useCollection(getCarsColletion.orderBy('year','asc'));
    return  <div className="cars">
                    { error && <Error errorMessage={error} errorImage={pngError}/> }
                { loading && <Loading loadingImage={gifLoading}/>  }
                    { value && <List> 
                                    { value.docs.map( car=>
                                            <Car key={car.id} 
                                                 item={{id:car.id, ...car.data()}
                                    }/>)}
                                </List>}
                    { value &&  value.docs.length === 0  &&  <Typography align="center" variant="h6" gutterBottom>No cars registered on database</Typography> }
            </div>
}



function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export { Cars }