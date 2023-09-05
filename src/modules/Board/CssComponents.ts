import { Stack, Button, Box, BoxProps } from '@mui/material';
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

export const CssColumn = styled(Stack)(({ theme }) => ({
   minWidth: '280px',
   maxWidth: '280px',
   paddingRight: '4px',

   overflowY: 'auto',

   scrollbarWidth: 'thin',
   '&::-webkit-scrollbar': {
      width: '0.4em',
   },
   '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: 8,
   },
   '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: 8,
   },
   '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
   },
}));

interface ColorLabel extends BoxProps {
   color: string;
}
export const CssColorLabel = styled(Box)<ColorLabel>(({ color }) => ({
   backgroundColor: color,
   width: '15px',
   borderRadius: '50%',
}));

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
