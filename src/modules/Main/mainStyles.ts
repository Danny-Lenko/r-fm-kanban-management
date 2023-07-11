import { styled } from '@mui/material/styles';
import { drawerWidthSm, drawerWidthMd } from '../../library/common/constants';
import { AppBtn } from '../../library/common/components';

// mui docs: Persistent Drawer
export const MainEl = styled('main', {
   shouldForwardProp: (prop) => prop !== 'open',
})<{
   open?: boolean;
}>(({ theme, open }) => ({
   flexGrow: 1,
   padding: theme.spacing(3),
   zIndex: 50,
   paddingBottom: 0,
   transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   marginLeft: `-${drawerWidthSm}`,
   [theme.breakpoints.down('md')]: {
      marginLeft: `-${drawerWidthMd}`,
   },
   [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
   },
   ...(open && {
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '0 !important',
   }),
}));

export const EyeBtn = styled(AppBtn)({
   zIndex: 1000,
   width: '80px',
   paddingRight: 2,
   paddingLeft: 5,
   position: 'absolute',
   bottom: '5%',
   left: -25,
   minHeight: '40px',
   '& svg': {
      // transform: 'translateY(25%)',
   },
});
