import { Stack, Button, } from '@mui/material';
import { styled } from '@mui/system';
import { AppbarHeight } from '../../library/common/constants';

export const CssBoard = styled(Stack)(({ theme }) => ({
   height: `calc(100vh - ${AppbarHeight.Xs} - ${theme.spacing(3)})`,
   [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${AppbarHeight.Sm} - ${theme.spacing(3)})`,
   },
}));
CssBoard.defaultProps = {
   direction: 'row',
   spacing: 3,
};

export const CssInteractiveScreen = styled(Stack)({});
CssInteractiveScreen.defaultProps = {
   pr: 2,
   pb: 3,
   direction: 'row',
   spacing: 3,
};

export const CssColumnButton = styled(Button)(({ theme }) => ({
   maxHeight: `calc(100% - 16px)`,
   borderRadius: '8px',
   textTransform: 'capitalize',
   minWidth: '280px',
   backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
   '& .MuiTypography-root': {
      color: theme.palette.greyCustom[200],
   },
}));
