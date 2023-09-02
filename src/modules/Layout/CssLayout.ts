import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssLayout = styled(Stack)({
   overflowX: 'auto',
   overflowY: 'hidden',
   maxHeight: '100vh',

   scrollbarWidth: 'thin',
   '&::-webkit-scrollbar': {
      height: '0.7em',
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
});
CssLayout.defaultProps = {
   direction: 'row',
};
