import { Stack, Button } from '@mui/material';
import { styled } from '@mui/system';
import { AppbarHeight } from '../../library/common/constants';

export const CssBoard = styled(Stack)(({ theme }) => ({
   height: `calc(100vh - ${AppbarHeight.Xs} - ${theme.spacing(4)})`,
   [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${AppbarHeight.Sm} - ${theme.spacing(4)})`,
   },
}));
CssBoard.defaultProps = {
   direction: 'row',
   // spacing: 3,
};

export const CssInteractiveScreen = styled(Stack)({});
CssInteractiveScreen.defaultProps = {
   pr: 2,
   pb: 3,
   direction: 'row',
   spacing: 3,
};

export const CssAddButton = styled(Button)(({ theme }) => ({
   color: theme.palette.greyCustom[200],
   height: 'fit-content',
   borderRadius: '8px',
   textTransform: 'capitalize',
   backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
   '& .MuiTypography-root': {
      color: theme.palette.greyCustom[200],
   },
}));

export const CssColumnButton = styled(CssAddButton)(({ theme }) => ({
   padding: '48px 0',
   minWidth: '280px',
}));
