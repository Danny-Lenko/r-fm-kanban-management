import { Select } from '@mui/material';
import { styled } from '@mui/system';

export const AppSelect = styled(Select)(({ theme }) => ({
   fontWeight: 700,
   width: '100%',
   borderColor: theme.palette.primary.main,
   '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
   },
}));

AppSelect.defaultProps = { size: 'small' };
