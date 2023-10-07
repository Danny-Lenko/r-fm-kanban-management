import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

import { motion } from 'framer-motion';

export const CssCard = styled(motion.div)({
   cursor: 'pointer',
   zIndex: 100,
   boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
   padding: '20px 16px',
   borderRadius: '4px',
});

export const CssTitle = styled(motion.p)(({ theme }) => ({
   color: theme.palette.text.primary,
   fontWeight: 'bold',
   fontSize: '16px',
   margin: '0 0 4px',
}));

export const CssSubtasks = styled(motion.p)(({ theme }) => ({
   fontSize: '13px',
   margin: 0,
   color: theme.palette.greyCustom[200],
}));

// export const CssSubtasks = styled(Typography)(({ theme }) => ({
//    color: theme.palette.greyCustom[200],
// }));
// CssSubtasks.defaultProps = {
//    variant: 'body2',
// };

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

export const ExpandedCard = styled(motion.div)({
   border: '1px solid black',
   width: '400px',
   background: '#fff',
   cursor: 'pointer',
   zIndex: 100,
   boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
});
