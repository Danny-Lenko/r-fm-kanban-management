import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CssTextField = styled(TextField)(({ theme, error }) => ({
   backgroundColor: theme.palette.background.default,

   '& .MuiTextField-root': {
      position: 'relative',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
         borderColor: theme.palette.divider,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.divider,
      },

      '& .MuiOutlinedInput-notchedOutline': {
         borderColor: error ? 'red' : theme.palette.divider,
      },
   },
   '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: 10,
      margin: 0,
      userSelect: 'none',
   },
}));
CssTextField.defaultProps = {
   'aria-label': 'text-field',
};
