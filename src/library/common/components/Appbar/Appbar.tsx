import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Box from '@mui/material/Box/Box';
import logoDark from '../../../../resources/assets/logo-dark.svg';
import logoLight from '../../../../resources/assets/logo-light.svg';
import logoMobile from '../../../../resources/assets/logo-mobile.svg';
import { AppBarEl, appbarStyles } from './appbarStyles';
import { setXsBoardsOpen } from '../../../../main/slices/modalElsSlice';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import XsBoardsModal from './XsBoardsModal/XsBoardsModal';
import ButtonsBox from './ButtonsBox/ButtonsBox';

const Appbar = () => {
   const { drawer, modals, data } = useAppSelector((state) => state);
   const { open } = drawer;
   const { xsBoardsOpen } = modals;
   const { activeBoard } = data;

   const dispatch = useAppDispatch();

   const theme = useTheme();
   const { breakpoints } = theme;
   const xsScreen = useMediaQuery(breakpoints.down('sm'));

   return (
      <AppBarEl
         sx={() => appbarStyles(open, theme)}
         color='inherit'
         elevation={0}
         position='fixed'
         open={open}
      >
         {xsScreen && <XsBoardsModal />}
         <Toolbar>
            <Box className='logo-wrapper'>
               <Box
                  component='img'
                  sx={{ width: { xs: '24px', sm: '153px' } }}
                  src={
                     xsScreen
                        ? logoMobile
                        : theme.palette.mode === 'light'
                        ? logoDark
                        : logoLight
                  }
                  alt='kanban'
               ></Box>
            </Box>
            <Typography
               variant='h2'
               noWrap
               component='div'
               onClick={() => {
                  return xsScreen && xsBoardsOpen
                     ? dispatch(setXsBoardsOpen(false))
                     : xsScreen
                     ? dispatch(setXsBoardsOpen(true))
                     : null;
               }}
            >
               {activeBoard.name}
            </Typography>
            {xsScreen && xsBoardsOpen ? (
               <ExpandLessRoundedIcon />
            ) : xsScreen ? (
               <ExpandMoreRoundedIcon />
            ) : null}
            <ButtonsBox />
         </Toolbar>
      </AppBarEl>
   );
};

export default Appbar;
