import { styled } from '@mui/system';
import {
   TextField,
   StandardTextFieldProps,
   AccordionSummary,
} from '@mui/material';

interface Props extends StandardTextFieldProps {
   isEditMode: boolean;
}

export const CssSummary = styled(AccordionSummary)(({ theme }) => ({
   '& .MuiAccordionSummary-content': {
      alignItems: 'center',

      '& form': {
         width: '85%',
      },
   },
}));

export const CssTitleField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== 'isEditMode',
})<Props>(({ theme, error, isEditMode }) => ({
   width: '100%',
   pointerEvents: !isEditMode ? 'none' : 'all',
   '& .MuiTextField-root': {
      position: 'relative',
   },
   '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
         borderColor: error ? 'red' : !isEditMode ? 'transparent' : false,
      },

      '& .MuiOutlinedInput-input': {
         fontSize: '14px',
         padding: '1px 4px 3px',
      },
   },
   '& .MuiFormHelperText-root': {
      margin: 0,
   },
}));
