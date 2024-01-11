import { styled } from '@mui/material';
import { AppBtn } from '../../..';

export const CssButton = styled(AppBtn)(({ theme }) => ({
   marginTop: 16,
}));
CssButton.defaultProps = {
   fullWidth: true,
   type: 'submit' as 'submit',
   buttonSize: 'small' as 'small',
   color: 'primary' as 'primary',
};
