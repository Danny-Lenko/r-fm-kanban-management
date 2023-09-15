import { Button } from '@mui/material';
import { styled } from '@mui/system';

import { DrawerPaddingX } from '../../../../library/common/constants';

const buttonWidth = `calc(100% + ${DrawerPaddingX} * 2)`;

export const CssButton = styled(Button)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   textTransform: 'capitalize',
   position: 'relative',
   width: buttonWidth,
   color: theme.palette.greyCustom[200],
   fontSize: 15 / 16 + 'rem',
   margin: `16px -${DrawerPaddingX.Xs}`,
   '& .MuiSvgIcon-root': {
      transform: 'translateY(4px)',
   },
}));
