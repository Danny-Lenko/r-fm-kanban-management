import { styled } from '@mui/system';

import { AppBtn } from '../../../AppBtn';

export const CssButton = styled(AppBtn)(({ theme }) => ({
   marginTop: theme.spacing(4),
   textTransform: 'capitalize',

   '&:first-of-type': {
      flexGrow: 1,
   },
   '&:nth-of-type(2)': {
      marginLeft: 'auto',
   },
}));
CssButton.defaultProps = {
   children: 'save changes',
   type: 'submit' as 'submit',
   buttonSize: 'small' as 'small',
   color: 'primary' as 'primary',
};
