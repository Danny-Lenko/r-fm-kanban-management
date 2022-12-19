import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Box from '@mui/material/Box/Box';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'
import logoMobile from '../../../../resources/assets/logo-mobile.svg'
import CustomBtn from '../CustomBtn/CustomBtn';
import DotsMenu from '../DotsMenu/DotsMenu';
import { AppBarEl, appbarStyles, sxPlusBtnStyles } from './appbarStyles';
import { openTaskEditor, setXsBoardsOpen } from '../../../../main/slices/modalElsSlice';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import XsBoardsModal from './XsBoardsModal';

const Appbar = () => {
   const open = useAppSelector(state => state.drawer.open)
   const xsBoardsOpen = useAppSelector(state => state.modals.xsBoardsOpen)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const dispatch = useAppDispatch()
   const theme = useTheme()
   const xsScreen = useMediaQuery(theme.breakpoints.down('sm'))

   return (
      <AppBarEl sx={() => appbarStyles(open, theme)} color='inherit' elevation={0} position="fixed" open={open}>
         {
            xsScreen && <XsBoardsModal />
         }
         <Toolbar>
            <Box className='logo-wrapper'>
               <Box
                  component='img'
                  sx={{ width: { xs: '24px', sm: '153px' } }}
                  src={xsScreen ? logoMobile : theme.palette.mode === 'light' ? logoDark : logoLight}
                  alt='kanban'
               ></Box>
            </Box>
            <Typography
               variant="h2"
               noWrap
               component="div"
               onClick={() => xsScreen && dispatch(setXsBoardsOpen(true))}
            >
               {activeBoard.name}
            </Typography>
            {
               (xsScreen && xsBoardsOpen) ? <ExpandLessRoundedIcon />
               : xsScreen ? <ExpandMoreRoundedIcon />
               : null

            }
            <Box className='btns-box'>
               {
                  xsScreen
                     ? <IconButton
                        disabled={!activeBoard.columns[0]}
                        sx={sxPlusBtnStyles}
                        onClick={() => dispatch(openTaskEditor('open'))}
                     >
                        <AddRoundedIcon />
                     </IconButton>
                     : <CustomBtn
                        disabled={!activeBoard.columns[0]}
                        sizeSm={false}
                        color='primary'
                        text='+ Add New Task'
                        onclick={() => dispatch(openTaskEditor('open'))}
                     />
               }

               <DotsMenu isTaskMenu={false} />
            </Box>
         </Toolbar>
      </AppBarEl>
   );
}

export default Appbar;