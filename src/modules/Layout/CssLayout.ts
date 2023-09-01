import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssLayout = styled(Stack)({
   overflowX: 'auto',
   overflowY: 'hidden',
   maxHeight: '100vh',
});
CssLayout.defaultProps = {
   direction: 'row',
};
