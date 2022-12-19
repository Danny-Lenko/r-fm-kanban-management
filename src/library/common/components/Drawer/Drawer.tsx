import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../hooks/hooks';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerBlindBtn from './DrawerBlindBtn/DrawerBlindBtn';
import logoDark from '../../../../resources/assets/logo-dark.svg'
import logoLight from '../../../../resources/assets/logo-light.svg'
import DrawerModeBtn from './DrawerModeBtn/DrawerModeBtn';
import useTheme from '@mui/material/styles/useTheme';
import assembleDrawerStyles from './drawerStyles';
import BoardsList from '../BoardsList/BoardsList';

export default function PersistentDrawerLeft() {
  const open = useAppSelector(state => state.drawer.open)
  const theme = useTheme()

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

      <BoardsList />

      <DrawerModeBtn />
      <DrawerBlindBtn />
    </Drawer>
  );
}