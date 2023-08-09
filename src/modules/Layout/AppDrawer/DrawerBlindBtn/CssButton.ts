import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const CssButton = styled(Button)(({ theme }) => ({
   position: 'absolute',
   left: -10,
   bottom: '5%',
   margin: '0 11px',
   paddingLeft: '24px',
   paddingRight: '16px',
   justifyContent: 'flex-start',
   textTransform: 'capitalize',
   color: theme.palette.greyCustom[200],
   fontSize: 15 / 16 + 'rem',
   '& .MuiSvgIcon-root': {
      transform: 'translateY(4px)',
   },
}));

