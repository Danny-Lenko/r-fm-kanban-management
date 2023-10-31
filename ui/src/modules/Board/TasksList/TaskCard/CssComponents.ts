import { styled } from '@mui/system';

import { motion } from 'framer-motion';

export const CssCard = styled(motion.div)({
   cursor: 'pointer',
   zIndex: 100,
   boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
   padding: '20px 16px',
   borderRadius: '4px',
   background: '#fff',
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
