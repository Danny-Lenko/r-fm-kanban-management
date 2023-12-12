import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { selectIsDrawerOpen, openDrawer } from '../../main/store';

import { AppDrawer, AppBar, CssLayout, EyeBtn, CssMain } from '.';
import { CssDrawerHeader } from '../../library/common/components';

import { ReactComponent as eyeIcon } from '../../resources/assets/icon-show-sidebar.svg';

type Props = {
   children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
   const open = useAppSelector(selectIsDrawerOpen);
   const theme = useTheme();
   const sxScreen = useMediaQuery(theme.breakpoints.down('sm'));

   const { pathname } = useLocation();
   const isHome = pathname === '/' || pathname === '/categories-grid';

   const dispatch = useAppDispatch();

   const handleOpenDrawer = () => {
      dispatch(openDrawer());
   };

   return (
      <CssLayout>
         <AppBar isHome={isHome} />
         <AppDrawer />

         {/*---- Complements the drawer ----*/}
         <CssMain open={open}>
            {/*---- Gap below the appbar -----*/}
            <CssDrawerHeader />
            {children}
         </CssMain>

         {!sxScreen && !isHome && (
            <EyeBtn
               color='primary'
               icon={eyeIcon}
               onClick={handleOpenDrawer}
            ></EyeBtn>
         )}
      </CssLayout>
   );
};
