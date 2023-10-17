import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CssTextField = styled(TextField)<{
   fontSize?: string;
   completed?: number;
   checked?: number;
}>(({ theme, error, fontSize, completed, checked }) => ({
   padding: 0,

   '&:hover': {
      backgroundColor: theme.palette.background.default,
   },

   '& .Mui-focused': {
      backgroundColor: theme.palette.background.default,
   },

   '& .MuiInputBase-input': {
      padding: '8px 14px',
      fontSize: fontSize || '0.9rem',
      textDecoration: checked ? 'line-through' : 'none',
      color: !completed
         ? theme.palette.text.primary
         : theme.palette.greyCustom[200],
   },

   '& .MuiTextField-root': {
      position: 'relative',
   },
   '& .MuiOutlinedInput-root': {
      padding: 0,
      '& fieldset': {
         // padding: '8px',
         borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
         borderColor: theme.palette.divider,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.divider,
      },

      '& .MuiOutlinedInput-notchedOutline': {
         borderColor: error ? 'red' : 'transparent',
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
