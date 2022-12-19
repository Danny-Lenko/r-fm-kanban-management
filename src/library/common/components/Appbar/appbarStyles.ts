import MuiAppBar from '@mui/material/AppBar';
import { styled, Theme } from '@mui/material/styles';
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from '../../constants/constants';
import { AppBarProps } from '../../../interfaces/interfaces';

// mui docs: Persistent Drawer
export const AppBarEl = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
   elevation: 0,
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      width: `calc(100% - ${DRAWERWIDTHMD})`,
      [theme.breakpoints.down('md')]: {
         width: `calc(100% - ${DRAWERWIDTHSM}) !important`
      },
      [theme.breakpoints.down('sm')]: {
         width: `100% !important`
      },
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   })
}));

export const appbarStyles = (open: any, theme: Theme) => ({
   borderBottom: '1.2px solid',
   borderBottomColor: theme.palette.divider,
   marginLeft: open ? { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD } : 0,
   '& .MuiToolbar-root': {
      minHeight: { xs: '64px', sm: '81px', md: '97px' },
      position: 'relative',
      '& .logo-wrapper': {
         lineHeight: 1,
         display: !open ? 'block' : 'none',
         mr: { xs: 2, sm: '50px' },
         '&:after': {
            visibility: {xs: 'hidden', sm: 'visible'},
            content: '""',
            position: 'absolute',
            width: '1.5px',
            height: '100%',
            backgroundColor: theme.palette.divider,
            bottom: -0.5,
            left: '200px',
         }
      },
      '& .btns-box': {
         marginLeft: 'auto',
         display: 'flex',
         alignItems: 'center',
         gap: 3,
         '& .MuiButton-root': {
            padding: '0.6rem 1.5rem',
            width: 'unset'
         }
      }
   }
})

export const sxPlusBtnStyles = {
   px: 2,
   py: 0.5,
   borderRadius: '24px',
   backgroundColor: 'primaryCustom.main',
   color: '#fff',
   ml: 1,
   '&:hover': {
      backgroundColor: 'primaryCustom.light'
   },
   '& svg': {
      fontSize: '1.7rem',
      fontWeight: 700
   }
}
