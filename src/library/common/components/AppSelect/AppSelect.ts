import { Select } from '@mui/material';
import { styled } from '@mui/system';

export const AppSelect = styled(Select)(({ theme }) => ({
   fontWeight: 700,
   width: '100%',
   backgroundColor: theme.palette.background.default,

   '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
   },
}));

AppSelect.defaultProps = {
   size: 'small',
   'aria-label': 'select-dropdown',
};
