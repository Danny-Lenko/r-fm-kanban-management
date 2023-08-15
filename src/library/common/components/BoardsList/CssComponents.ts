import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DrawerPaddingX } from '../../constants';

export const CssBoardsLabel = styled(Typography)({
   textTransform: 'uppercase',

   '&[aria-label=drawer]': {
      marginTop: '16px',
   },
});

export const CssBtnBox = styled(Box)({
   maxHeight: '50vh',
   overflowY: 'auto',
   transform: `translateX(-${DrawerPaddingX.Xs})`,
   marginBottom: '16px',
});
