import  React , { useState }  from  'react';

import MenuIcon from '@material-ui/icons/Menu';
import { Menu, IconButton } from '@material-ui/core';
import { DialogAddCar } from './DialogAddCar';
import { addCar } from './Service';



function MenuOptions() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleAnchor = e => setAnchorEl(e ? e.currentTarget : null);
    return  <div>
                <IconButton color="inherit"  aria-owns='fade-menu' aria-haspopup='true' onClick={handleAnchor} aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Menu id="fade-menu" anchorEl={anchorEl} open={ Boolean(anchorEl)} onClose={() => handleAnchor(null)}>
                    <DialogAddCar confirm={car => addCar(car,console.log)}/>

                </Menu>
            </div>


}

export {MenuOptions}

