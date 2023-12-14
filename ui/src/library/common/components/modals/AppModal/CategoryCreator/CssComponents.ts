import { styled } from '@mui/system';

import { CssTextField as Field } from '..';
import { AppBtn } from '../../..';
import { ButtonProps } from '@mui/material';

export const CssTextField = styled(Field)({
   '& .MuiInputBase-input': {
      fontSize: '24px',
   },
});

interface Props extends ButtonProps {
   isConflict: boolean;
}

export const CssButton = styled(AppBtn)<Props>(({ theme, isConflict }) => ({
   display: 'block',
   minWidth: '50%',
   width: 'fit-content',
   margin: '32px auto 0',
   fontSize: '18px',
   paddingTop: 8,
   paddingBottom: 8,

   '&:disabled': {
      color: isConflict && theme.palette.error.light,
   },
}));
