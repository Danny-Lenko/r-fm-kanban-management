import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../../library/common/hooks';
import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';
import useTheme from '@mui/material/styles/useTheme';
import assembleDrawerStyles from './appDrawerStyles';
import BoardsList from '../../../library/common/components/BoardsList/BoardsList';

import { DrawerHeader } from '../../../library/common/components/DrawerHeader';

import { DrawerModeBtn } from '../../../library/common/components/DrawerModeBtn';
import { DrawerBlindBtn } from './DrawerBlindBtn';

export const AppDrawer: React.FC = () => {
   const open = useAppSelector((state) => state.drawer.open);
   const theme = useTheme();

   return (
      <Drawer
         sx={assembleDrawerStyles(theme)}
         variant='persistent'
         anchor='left'
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
};
