import { InputLabel } from '@mui/material';
import { styled } from '@mui/system';

export const CssLabel = styled(InputLabel)(({ theme }) => ({
   fontSize: '12px',
   fontWeight: 600,
   color:
      theme.palette.mode === 'light'
         ? theme.palette.greyCustom[200]
         : theme.palette.common.white,
   margin: '16px 0 4px',
}));
