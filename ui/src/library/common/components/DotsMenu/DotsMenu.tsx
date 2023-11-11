import { useState, MouseEvent } from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { dotsMenuOptions } from '../../constants';

import { DotsMenuItem } from '.';

export const DotsMenu = ({ isTaskMenu }: { isTaskMenu: boolean }) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const { taskMenu, boardMenu } = dotsMenuOptions;
   const options = isTaskMenu ? taskMenu : boardMenu;

   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <IconButton
            sx={{ p: 0, width: 0 }}
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
         >
            <MoreVertIcon viewBox='0 0 24 24' />
         </IconButton>
         <Menu
            sx={{ zIndex: 12000 }}
            id='long-menu'
            MenuListProps={{
               'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  width: '20ch',
               },
            }}
         >
            {options.map((option) => (
               <DotsMenuItem
                  key={option}
                  option={option}
                  handleClose={handleClose}
               />
            ))}
         </Menu>
      </div>
   );
};
