import { Box, useTheme } from '@mui/material';

import { useAppSelector } from '../../../library/common/hooks';
import {
   CssDrawerHeader,
   ColorModeButton,
   BoardsList,
} from '../../../library/common/components';

import { DrawerBlindBtn, CssDrawer } from '.';

import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';
import { selectDrawerIsOpen } from '../../../main/store';

const sx = { transform: 'translateY(8px)', width: '153px' };

export const AppDrawer: React.FC = () => {
   const open = useAppSelector(selectDrawerIsOpen);
   const theme = useTheme();

   return (
      <CssDrawer variant='persistent' anchor='left' open={open}>
         <CssDrawerHeader>
            <Box
               component='img'
               sx={sx}
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
