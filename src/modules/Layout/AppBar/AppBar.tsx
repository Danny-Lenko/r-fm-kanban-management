import { Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useAppDispatch, useAppSelector } from '../../../library/common/hooks';

import { setXsBoardsOpen } from '../../../main/slices/modalSlice';

import {
   XsBoardsModal,
   ButtonsBox,
   CssAppBar,
   CssLogo,
   CssLogoWrapper,
   CssBoardTitle,
} from '.';

import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';
import logoMobile from '../../../resources/assets/logo-mobile.svg';

export const AppBar = () => {
   const { drawer, modals, data } = useAppSelector((state) => state);
   const { open } = drawer;
   const { xsBoardsOpen } = modals;
   const { activeBoard } = data;

   const dispatch = useAppDispatch();

   const theme = useTheme();
   const { breakpoints } = theme;
   const xsScreen = useMediaQuery(breakpoints.down('sm'));

   const handleClick = () =>
      xsScreen &&
      (xsBoardsOpen
         ? dispatch(setXsBoardsOpen(false))
         : dispatch(setXsBoardsOpen(true)));

   const logo = xsScreen
      ? logoMobile
      : theme.palette.mode === 'light'
      ? logoDark
      : logoLight;

   return (
      <CssAppBar open={open}>
         {xsScreen && <XsBoardsModal />}
         <Toolbar>
            <CssLogoWrapper open={open}>
               <CssLogo src={logo} />
            </CssLogoWrapper>

            <CssBoardTitle onClick={handleClick} children={activeBoard.name} />

            {xsScreen &&
               (xsBoardsOpen ? (
                  <ExpandLessRoundedIcon />
               ) : (
                  <ExpandMoreRoundedIcon />
               ))}

            <ButtonsBox xsScreen={xsScreen} />
         </Toolbar>
      </CssAppBar>
   );
};
