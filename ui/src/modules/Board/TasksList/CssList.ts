import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssList = styled(Stack)({
   overflowY: 'auto',
   overflowX: 'hidden',
});
CssList.defaultProps = {
   spacing: 2.5,
};
