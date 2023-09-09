import { Stack, Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';

export const CssColumn = styled(Stack)({
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
});
CssColumn.defaultProps = {
   spacing: 2.5,
};

interface ColorLabel extends BoxProps {
   color: string;
}
export const CssColorLabel = styled(Box)<ColorLabel>(({ color }) => ({
   backgroundColor: color,
   width: '15px',
   borderRadius: '50%',
}));
