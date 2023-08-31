import { Stack, Button } from '@mui/material';
import { styled } from '@mui/system';
import { AppbarHeight } from '../../library/common/constants';

export const CssBoard = styled(Stack)(({ theme }) => ({
   height: `calc(100vh - ${AppbarHeight.Xs} - ${theme.spacing(3)})`,
   maxWidth: '100vw',
   overflow: 'auto',
   paddingRight: theme.spacing(3),
   marginRight: theme.spacing(3),
   boxSizing: 'border-box',
   // marginBottom: '16px',
   [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${AppbarHeight.Sm} - ${theme.spacing(3)})`,
   },
}));

// export const CssInteractive

export const CssColumn = styled(Stack)(({ theme }) => ({
   minWidth: '280px',
   maxWidth: '280px',
}));

export const CssColumnButton = styled(Button)(({ theme }) => ({
   borderRadius: '8px',
   textTransform: 'capitalize',
   minWidth: '280px',
   // marginBottom: '16px',
   paddingBottom: '16px',
   backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
   '& .MuiTypography-root': {
      // color: 'greyCustom.200',
      color: theme.palette.greyCustom[200],
   },
}));
