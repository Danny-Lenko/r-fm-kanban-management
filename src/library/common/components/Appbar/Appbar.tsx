import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from '../../constants/constants';
import { useAppSelector } from '../../hooks/hooks';
import { AppBarProps } from '../../../interfaces/interfaces';
import Box from '@mui/material/Box/Box';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'

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

const appbarStyles = (open: any) => ({
   borderBottom: '2px solid #E4EBFA',
   marginLeft: open ? { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD } : 0,
   '& .MuiToolbar-root': {
      minHeight: { xs: '64px', sm: '81px', md: '97px' },
      position: 'relative',
      '& .logo-wrapper': {
         lineHeight: 1,
         display: !open ? 'block' : 'none',
         mr: '50px',
         '&:after': {
            content: '""',
            position: 'absolute',
            width: '2px',
            height: '100%',
            backgroundColor: 'linesCustom.light',
            bottom: -0.5,
            left: '200px',
         }
      }
   }
})

const Appbar = () => {
   const open = useAppSelector(state => state.drawer.open)

   return (
      <AppBar sx={() => appbarStyles(open)} color='inherit' elevation={0} position="fixed" open={open}>
         <Toolbar>
            <Box className='logo-wrapper'>
               <Box
                  component='img'
                  sx={{ width: '153px'}}
                  src={logoDark}
                  alt='kanban'
               ></Box>
            </Box>
            <Typography variant="h2" noWrap component="div" >
               Platform Launch
            </Typography>
         </Toolbar>
      </AppBar>
   );
}

export default Appbar;