import { Box, useTheme } from '@mui/material';

import { useAppSelector } from '../../../library/common/hooks';
import {
   CssDrawerHeader,
   ColorModeButton,
} from '../../../library/common/components';
import { BoardsList } from '..';
import { DrawerBlindBtn, CssDrawer } from '.';

import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';

export const AppDrawer: React.FC = () => {
   const open = useAppSelector((state) => state.drawer.open);
   const theme = useTheme();

   return (
      <CssDrawer variant='persistent' anchor='left' open={open}>
         <CssDrawerHeader>
            <Box
               component='img'
               sx={{ width: '153px' }}
               src={theme.palette.mode === 'light' ? logoDark : logoLight}
               alt='kanban'
            ></Box>
         </CssDrawerHeader>

         <BoardsList />

         <ColorModeButton />
         <DrawerBlindBtn />
      </CssDrawer>
   );
};
