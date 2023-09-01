import { styled } from '@mui/system';
import { Paper, PaperProps } from '@mui/material';

export const CssContent = styled(Paper)<PaperProps>(({ theme, ...rest }) => ({
   textTransform: 'capitalize',
   fontWeight: 700,
   position: 'absolute',
   top: '50%',
   left: '50%',
   border: '2px solid #000',
   borderRadius: '8px',
   boxShadow: '24',
   transform: 'translate(-50%, -50%)',
   backgroundColor: theme.palette.background.paper,
   width: 300,
   padding: '24px',
   // scrollbar settings
   maxHeight: '100vh',
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

   [theme.breakpoints.up('sm')]: {
      width: '480px',
      padding: '32px',
   },

   '& .MuiTypography-root': {
      marginBottom: '12px',
   },

   '& .MuiTypography-h3': {
      color: theme.palette.text.primary,
   },

   '& .MuiTypography-body1': {
      color: theme.palette.greyCustom[200],
   },
}));
