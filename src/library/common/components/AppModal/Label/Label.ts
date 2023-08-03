import { InputLabel } from '@mui/material';
import { styled } from '@mui/system';

export const Label = styled(InputLabel)(({ theme }) => ({
   fontSize: '12px',
   color:
      theme.palette.mode === 'light'
         ? theme.palette.greyCustom[200]
         : theme.palette.common.white,
   margin: '24px 0 8px',
}));
