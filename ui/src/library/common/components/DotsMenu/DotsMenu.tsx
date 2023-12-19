import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { DotsMenuItem } from '.';
import { dotsMenuOptions } from '../../constants';

interface Props {
   mode: keyof typeof dotsMenuOptions;
}

export const DotsMenu: React.FC<Props> = ({ mode }) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const options = dotsMenuOptions[mode as keyof typeof dotsMenuOptions];

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
