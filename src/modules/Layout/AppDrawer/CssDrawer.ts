import { Drawer } from '@mui/material';
import { styled } from '@mui/system';

import { DrawerWidth } from '../../../library/common/constants';

export const CssDrawer = styled(Drawer)(({ theme }) => ({
   position: 'relative',
   flexShrink: 0,
   width: 0,
   [theme.breakpoints.up('sm')]: {
      width: DrawerWidth.Sm,
   },
   [theme.breakpoints.up('md')]: {
      width: DrawerWidth.Md,
   },

   '& .MuiDrawer-paper': {
      width: 0,
      boxSizing: 'border-box',
      [theme.breakpoints.up('sm')]: {
         width: DrawerWidth.Sm,
         padding: '0 24px',
      },
      [theme.breakpoints.up('md')]: {
         width: DrawerWidth.Md,
      },
   },
}));
