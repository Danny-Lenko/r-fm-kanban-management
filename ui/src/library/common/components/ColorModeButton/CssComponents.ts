import { Switch, Box } from '@mui/material';
import { styled } from '@mui/system';

export const Android12Switch = styled(Switch)(({ theme }) => ({
   padding: 8,
   marginRight: '5px',
   '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      backgroundColor: '#635FC7',
      opacity: 1,
      '&:before, &:after': {
         content: '""',
         position: 'absolute',
         top: '50%',
         transform: 'translateY(-50%)',
         width: 16,
         height: 16,
      },
   },
   '& .Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#635FC7 !important',
      opacity: '1 !important',
   },
   '& .MuiSwitch-thumb': {
      backgroundColor: '#fff',
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
   },
}));

export const CssWrapper = styled(Box)(({ theme }) => ({
   minHeight: '48px',
   width: '85%',
   margin: '0 auto',
   borderRadius: '6px',
   backgroundColor: theme.palette.background.default,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 'auto',
   '& .MuiSvgIcon-root': {
      transform: 'translateY(12%)',
   },
}));
