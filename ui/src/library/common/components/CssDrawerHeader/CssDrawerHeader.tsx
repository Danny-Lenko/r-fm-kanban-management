import { styled } from '@mui/material/styles';
import { AppbarHeight } from '../../constants';

// mui docs: Persistent Drawer
export const CssDrawerHeader = styled('div')(({ theme }) => ({
   // necessary for content to be Elbelow app bar
   ...theme.mixins.toolbar,

   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   minHeight: AppbarHeight.Xs,

   [theme.breakpoints.up('sm')]: {
      minHeight: AppbarHeight.Sm,
   },
}));

