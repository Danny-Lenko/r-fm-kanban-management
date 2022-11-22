import { styled } from '@mui/material/styles';
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from "../../constants/constants";

// mui docs: Persistent Drawer
const MainEl = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
   open?: boolean;
}>(({ theme, open }) => ({
   flexGrow: 1,
   height: '100vh',
   padding: theme.spacing(3),
   backgroundColor: '#F2F2F2',
   transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   marginLeft: `-${DRAWERWIDTHMD}`,
   [theme.breakpoints.down('md')]: {
      marginLeft: `-${DRAWERWIDTHSM}`
   },
   [theme.breakpoints.down('sm')]: {
      marginLeft: 0
   },
   ...(open && {
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '0 !important',
   }),
}));

export default MainEl