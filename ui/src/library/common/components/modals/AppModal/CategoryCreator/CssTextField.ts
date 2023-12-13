import { styled } from '@mui/system';

import { CssTextField as Field } from '..';
import { AppBtn } from '../../..';

export const CssTextField = styled(Field)({
   '& .MuiInputBase-input': {
      fontSize: '24px',
   },
});

export const CssButton = styled(AppBtn)({
   display: 'block',
   width: '50%',
   margin: '32px auto 0',
   fontSize: '18px',
   paddingTop: 8,
   paddingBottom: 8
});
