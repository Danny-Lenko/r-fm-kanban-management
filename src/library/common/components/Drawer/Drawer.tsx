import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerBlindBtn from './DrawerBlindBtn/DrawerBlindBtn';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'
import DrawerModeBtn from './DrawerModeBtn/DrawerModeBtn';
import useTheme from '@mui/material/styles/useTheme';
import assembleDrawerStyles from './drawerStyles';
import { ReactComponent as IconBoard } from '../../../../resources/assets/icon-board.svg'
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { assignActiveBoard } from '../../../../main/slices/dataSlice';

export default function PersistentDrawerLeft() {
  const open = useAppSelector(state => state.drawer.open)
  const boards = useAppSelector(state => state.data.boards)
  const activeBoard = useAppSelector(state => state.data.activeBoard)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Drawer
      sx={assembleDrawerStyles(theme)}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          component='img'
          sx={{ width: '153px' }}
          src={theme.palette.mode === 'light' ? logoDark : logoLight}
          alt='kanban'
        ></Box>
      </DrawerHeader>

      <Typography variant='h5' textTransform='uppercase' mt={2}>all boards ({boards.length})</Typography>
      <List>
        {boards.map(board => (
          <ListItem key={board.name} disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(assignActiveBoard(board.id))
                navigate(`${board.path}`)
              }}
              className={activeBoard.path === board.path ? 'Mui-active' : ''}
            >
              <ListItemIcon>
                <SvgIcon component={IconBoard} />
              </ListItemIcon>
              <ListItemText primary={board.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <DrawerModeBtn />
      <DrawerBlindBtn />
    </Drawer>
  );
}