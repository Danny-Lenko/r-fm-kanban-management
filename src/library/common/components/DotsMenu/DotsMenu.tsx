import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TASKMENU, BOARDMENU } from '../../constants/constants';

// const options = [
//    'None',
//    'Remove',
//    'Callisto',
//    'Dione'
// ];

// const ITEM_HEIGHT = 48;

const DotsMenu = ({isTaskMenu}: {isTaskMenu:boolean}) => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const options = isTaskMenu ? TASKMENU : BOARDMENU

   return (
      <div>
         <IconButton
            sx={{p: 0, width: 0}}
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
         >
            <MoreVertIcon viewBox='0 0 24 24' />
         </IconButton>
         <Menu
            sx={{zIndex: 12000}}
            id="long-menu"
            MenuListProps={{
               'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
               },
            }}
         >
            {options.map((option) => (
               <MenuItem 
                  sx={{color: option.split(' ')[0] === 'Delete' ? 'destructCustom.main' : 'inherit'}} 
                  key={option} 
                  selected={option === 'Pyxis'} 
                  onClick={handleClose}
               >
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   );
}

export default DotsMenu;