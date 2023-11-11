import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { motion } from 'framer-motion';

export const CssHeading = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '1rem',
   '& .MuiTypography-h3': {
      color: theme.palette.text.primary,
      margin: 0
   },
}));

export const Overlay = styled(Box)({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: 'rgba(0, 0, 0, 0.4)',
   border: '1px solid black',

   zIndex: 10000,
});

export const ExpandedCard = styled(motion.div)(({ theme }) => ({
   textTransform: 'capitalize',
   fontWeight: 700,
   backgroundColor: '#ffffff',
   border: '2px solid #000',
   borderRadius: '8px',
   boxShadow: '24',
   width: 340,
   padding: '16px',

   [theme.breakpoints.up('sm')]: {
      width: '480px',
      padding: '32px',
   },

   '& .MuiTypography-root': {
      marginBottom: '12px',
   },

   '& .MuiTypography-h3': {
      color: theme.palette.text.primary,
   },

   '& .MuiTypography-body1': {
      color: theme.palette.greyCustom[200],
   },
}));
