import { styled } from '@mui/material';
import { AppBtn } from '../../..';

export const CssButton = styled(AppBtn)({
   marginTop: '16px',
});
CssButton.defaultProps = {
   type: 'submit' as 'submit',
   buttonSize: 'small' as 'small',
   color: 'primary' as 'primary',
   fullWidth: true,
};
