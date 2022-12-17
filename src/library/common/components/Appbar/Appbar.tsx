import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Box from '@mui/material/Box/Box';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'
import CustomBtn from '../CustomBtn/CustomBtn';
import DotsMenu from '../DotsMenu/DotsMenu';
import { AppBarEl, appbarStyles } from './appbarStyles';
import { openTaskEditor } from '../../../../main/slices/modalElsSlice';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';

const Appbar = () => {
   const open = useAppSelector(state => state.drawer.open)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const dispatch = useAppDispatch()
   const theme = useTheme()
   const sxScreen = useMediaQuery(theme.breakpoints.down('sm'))

   return (
      <AppBarEl sx={() => appbarStyles(open, theme)} color='inherit' elevation={0} position="fixed" open={open}>
         <Toolbar>
            <Box className='logo-wrapper'>
               <Box
                  component='img'
                  sx={{ width: '153px' }}
                  src={theme.palette.mode === 'light' ? logoDark : logoLight}
                  alt='kanban'
               ></Box>
            </Box>
            <Typography variant="h2" noWrap component="div" >
               {activeBoard.name}
            </Typography>
            <Box className='btns-box'>
               <CustomBtn
                  disabled={!activeBoard.columns[0]}
                  sizeSm={false}
                  color='primary'
                  text={sxScreen ? '+' : '+ Add New Task'}
                  onclick={ () => dispatch(openTaskEditor('open')) }
               />

               <DotsMenu isTaskMenu={false} />
            </Box>
         </Toolbar>
      </AppBarEl>
   );
}

export default Appbar;