import { Box } from '@mui/material';

import { AppDrawer } from './AppDrawer';
import { AppBar } from './AppBar';

type Props = {
   children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
   return (
      <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
         <AppBar />
         <AppDrawer />

         {children}
      </Box>
   );
};
