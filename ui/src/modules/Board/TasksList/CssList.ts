import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssList = styled(Stack)({
   overflowY: 'auto',
   overflowX: 'hidden',

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
});
CssList.defaultProps = {
   spacing: 2.5,
};
