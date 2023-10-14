import { styled } from '@mui/system';

import { AppBtn } from '../../../AppBtn';

export const CssButton = styled(AppBtn)(({ theme }) => ({
   marginTop: theme.spacing(4),
   textTransform: 'capitalize',
}));
CssButton.defaultProps = {
   children: 'save changes',
   type: 'submit' as 'submit',
   buttonSize: 'small' as 'small',
   color: 'primary' as 'primary',
   fullWidth: true,
};
