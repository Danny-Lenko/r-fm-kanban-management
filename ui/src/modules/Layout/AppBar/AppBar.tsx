import { Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import { useAppDispatch, useAppSelector } from '../../../library/common/hooks';
import { setXsBoardsOpen } from '../../../main/store/modals/modalSlice';
import { selectActiveBoard } from '../../../main/store';

import {
   ButtonsBox,
   CssAppBar,
   CssLogo,
   CssLogoWrapper,
   CssBoardTitle,
} from '.';

import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';
import logoMobile from '../../../resources/assets/logo-mobile.svg';

export const AppBar = ({ isHome }: { isHome: boolean }) => {
   const { drawer, modals } = useAppSelector((state) => state);
   const { open } = drawer;
   const { xsBoardsOpen } = modals;

   const activeBoard = useAppSelector(selectActiveBoard);

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

   const title = isHome ? 'All Boards View' : activeBoard.name;

   return (
      <CssAppBar open={open}>
         <Toolbar>
            <CssLogoWrapper open={open}>
               <CssLogo src={logo} />
            </CssLogoWrapper>

            <CssBoardTitle onClick={handleClick} children={title} />

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
