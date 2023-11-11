import { AppBar, Box, BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppBarProps } from '../../../library/interfaces';

import { DrawerWidth, AppbarHeight } from '../../../library/common/constants';

interface LogoWrapper extends BoxProps {
   open: boolean;
}

// mui docs: Persistent Drawer
export const CssAppBar = styled(AppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
   margin: `${theme.spacing(2)} ${theme.spacing(2)}`,
   borderBottom: '1.5px solid',
   borderBottomColor: theme.palette.divider,
   borderRadius: '12px',
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),

   // applies margin left
   // 32 px is the default mui setting
   marginLeft: '32px',
   width: `calc(100% - ${32}px)`,

   '& .MuiToolbar-root': {
      minHeight: AppbarHeight.Xs,

      [theme.breakpoints.up('sm')]: {
         minHeight: AppbarHeight.Sm,
      },
   },

   // drawer is open state
   ...(open && {
      width: `calc(100% - ${DrawerWidth.Md})`,
      paddingLeft: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
         width: `calc(100% - ${DrawerWidth.Sm}) !important`,
      },
      [theme.breakpoints.down('sm')]: {
         width: `100% !important`,
      },
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

CssAppBar.defaultProps = {
   color: 'inherit',
   elevation: 0,
   position: 'fixed',
};

export const CssLogoWrapper = styled(Box)<LogoWrapper>(({ theme, open }) => ({
   lineHeight: 1,
   display: !open ? 'block' : 'none',
   marginRight: '16px',

   [theme.breakpoints.up('sm')]: {
      marginRight: '50px',
   },

   '&:after': {
      visibility: 'hidden',
      content: '""',
      position: 'absolute',
      width: '1.5px',
      height: '100%',
      backgroundColor: theme.palette.divider,
      bottom: -0.5,
      left: '200px',

      [theme.breakpoints.up('sm')]: {
         visibility: 'visible',
      },
   },
}));

export const CssLogo = styled('img')(({ theme }) => ({
   width: '24px',
   [theme.breakpoints.up('sm')]: {
      width: '153px',
   },
}));

export const CssBoardTitle = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.primary,
   cursor: 'pointer',
   [theme.breakpoints.up('sm')]: {
      cursor: 'unset',
   },
}));

CssBoardTitle.defaultProps = {
   variant: 'h2',
   noWrap: true,
};
