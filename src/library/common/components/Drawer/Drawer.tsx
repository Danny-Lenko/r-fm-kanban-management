import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerBlindBtn from './DrawerBlindBtn/DrawerBlindBtn';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'
import DrawerModeBtn from './DrawerModeBtn/DrawerModeBtn';
import useTheme from '@mui/material/styles/useTheme';
import assembleDrawerStyles from './drawerStyles';
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { assignActiveBoard } from '../../../../main/slices/dataSlice';
import DrawerBoardBtn from './DrawerBoardBtn/DrawerBoardBtn';
import { openBoardManager } from '../../../../main/slices/modalElsSlice';

export default function PersistentDrawerLeft() {
  const open = useAppSelector(state => state.drawer.open)
  const boards = useAppSelector(state => state.data.boards)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()

  const handleOldBoardClick = (board:any) => {
    dispatch(assignActiveBoard(board.id))
    navigate(`${board.path}`)
  }

  const handleCreateBoardClick = () => {
    dispatch(openBoardManager('open'))
  }

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
        <Box sx={{maxHeight: '50vh', overflowY: 'auto'}}>
        {boards.map(board => (
          <DrawerBoardBtn
            key={board.id}
            props={{
              board: board,
              btnClick: () => handleOldBoardClick(board),
              btnText: board.name 
            }}
          />
        ))}
        </Box>
        <DrawerBoardBtn
          props={{
            board: null,
            btnClick: () => handleCreateBoardClick(),
            btnText: '+ Create New Board'
          }}
        />
      </List>

      <DrawerModeBtn />
      <DrawerBlindBtn />
    </Drawer>
  );
}