import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';

export const CssBox = styled(Box)({
   marginLeft: 'auto',
   display: 'flex',
   alignItems: 'center',
   gap: '24px',
   '& .MuiButton-root': {
      padding: '0.6rem 1.5rem',
      width: 'unset',
   },
});

export const XsPlusButton = styled(IconButton)(({ theme }) => ({
   color: '#fff',
   backgroundColor: theme.palette.primaryCustom.main,
   padding: '4px 16px',
   marginLeft: '8px',
   borderRadius: '24px',
   '&:hover': {
      backgroundColor: theme.palette.primaryCustom.light,
   },
   '& svg': {
      fontSize: '1.7rem',
      fontWeight: 700,
   },
}));
