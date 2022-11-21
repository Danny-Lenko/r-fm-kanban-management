import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from '../../constants/constants';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { AppBarProps } from '../../../interfaces/interfaces';
import { openDrawer } from '../Drawer/drawerSlice';

// mui docs: Persistent Drawer
const AppBar = styled(MuiAppBar, {
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

const appbarStyles = (open:any) => ({
   borderBottom: '2px solid #E4EBFA',
   marginLeft: open ? {xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD} : 0,
   '& .MuiToolbar-root': {
      minHeight: {xs: '64px', sm: '81px', md: '97px'}
   }
})

const Appbar = () => {
   const open = useAppSelector(state => state.drawer.open)
   const dispatch = useAppDispatch()

   return (
      <AppBar sx={() => appbarStyles(open)} color='inherit' elevation={0} position="fixed" open={open}>
         <Toolbar>
            <IconButton
               color="inherit"
               aria-label="open drawer"
               onClick={() => {
                  dispatch(openDrawer('open'))
               }}
               edge="start"
               sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
               <MenuIcon />
            </IconButton>
            <Typography variant="h2" noWrap component="div">
               Platform Launch
            </Typography>
         </Toolbar>
      </AppBar>
   );
}

export default Appbar;