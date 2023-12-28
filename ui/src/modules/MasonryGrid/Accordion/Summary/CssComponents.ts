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
   },
}));

export const CssTitleField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== 'isEditMode',
   // shouldForwardProp: (prop) => prop !== 'isEditMode',
})<Props>(({ theme, error, isEditMode }) => ({
   width: '85%',
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
      // position: 'absolute',
      // bottom: '-16px',
      margin: 0,
      // userSelect: 'none',
      // top: '50%',
      // top: 0,
      // transform: 'translateY(-50%)',
      // right: 10,
   },
}));
