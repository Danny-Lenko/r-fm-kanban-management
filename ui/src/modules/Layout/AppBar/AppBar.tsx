import { Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import {
   getQueryNames,
   useAppDispatch,
   useAppSelector,
   useGetQuery,
} from '../../../library/common/hooks';
import { setXsBoardsOpen } from '../../../main/store/modals/modalSlice';
import { selectActiveBoardId } from '../../../main/store';

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
import { IBoard } from '../../../library/interfaces';

export const AppBar = ({ isHome }: { isHome: boolean }) => {
   const { drawer, modals } = useAppSelector((state) => state);
   const { open } = drawer;
   const { xsBoardsOpen } = modals;

   const id = useAppSelector(selectActiveBoardId);

   const boardDetails = getQueryNames.boardDetails;

   const { isLoading, data, isError } = useGetQuery<IBoard>(boardDetails, id, {
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
      <CssAppBar isOpen={open}>
         <Toolbar>
            <CssLogoWrapper to='/' isOpen={open}>
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
