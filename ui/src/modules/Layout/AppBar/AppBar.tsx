import { Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import {
   ButtonsBox,
   CssAppBar,
   CssLogo,
   CssLogoWrapper,
   CssBoardTitle,
} from '.';
import {
   getQueryNames,
   useAppDispatch,
   useAppSelector,
   useGetQuery,
} from '../../../library/common/hooks';
import {
   selectActiveBoardId,
   selectDrawerIsOpen,
   selectXsBoardsOpen,
   setXsBoardsOpen,
} from '../../../main/store';
import { IBoard } from '../../../library/interfaces';

import logoDark from '../../../resources/assets/logo-dark.svg';
import logoLight from '../../../resources/assets/logo-light.svg';
import logoMobile from '../../../resources/assets/logo-mobile.svg';

export const AppBar = ({ isHome }: { isHome: boolean }) => {
   // const { drawer, modals } = useAppSelector((state) => state);
   const drawerIsOpen = useAppSelector(selectDrawerIsOpen);
   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);

   const id = useAppSelector(selectActiveBoardId);

   const boardDetails = getQueryNames.boardDetails;

   const { isLoading, data } = useGetQuery<IBoard>(boardDetails, id, {
      staleTime: 1000 * 60 * 20,
      enabled: !!id,
   });

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

   const title = isHome
      ? 'All Boards View'
      : isLoading
      ? 'Loading...'
      : data?.name;

   return (
      <CssAppBar isOpen={drawerIsOpen}>
         <Toolbar>
            <CssLogoWrapper to='/' isOpen={drawerIsOpen}>
               <CssLogo src={logo} />
            </CssLogoWrapper>

            <CssBoardTitle onClick={handleClick} children={title} />

            {xsScreen &&
               (xsBoardsOpen ? (
                  <ExpandLessRoundedIcon />
               ) : (
                  <ExpandMoreRoundedIcon />
               ))}

            <ButtonsBox xsScreen={xsScreen} isHome={isHome} />
         </Toolbar>
      </CssAppBar>
   );
};
