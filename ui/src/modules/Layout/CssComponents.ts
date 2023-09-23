import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import { AppBtn } from '../../library/common/components';

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

export const EyeBtn = styled(AppBtn)({
   zIndex: 1000,
   width: '80px',
   paddingRight: 2,
   paddingLeft: 5,
   position: 'absolute',
   bottom: '5%',
   left: -25,
   minHeight: '40px',
   '& svg': {
      transform: 'translateY(25%) translateX(25%)',
   },
});
