import { styled } from '@mui/system';

import { AppBtn } from '../../../AppBtn';
import { Typography } from '@mui/material';

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
   type: 'submit' as 'submit',
   buttonSize: 'small' as 'small',
   color: 'primary' as 'primary',
};

export const CssSavingText = styled(Typography)({
   '&.MuiTypography-root': {
      margin: '0 0 0 8px',
   },
});
