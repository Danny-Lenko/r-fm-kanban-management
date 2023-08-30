import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssBoard = styled(Stack)(({ theme }) => ({
   fontSize: '12px',
   fontWeight: 600,
   color:
      theme.palette.mode === 'light'
         ? theme.palette.greyCustom[200]
         : theme.palette.common.white,
   margin: '24px 0 8px',
}));
