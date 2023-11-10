import { styled } from '@mui/system';
import { Stack } from '@mui/material';

// import { motion } from 'framer-motion';

// export const CssHeading = styled(Box)(({ theme }) => ({
//    display: 'flex',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    gap: '1rem',
//    '& .MuiTypography-h3': {
//       color: theme.palette.text.primary,
//       margin: 0
//    },
// }));

export const CssStack = styled(Stack)({
   maxHeight: '400px',
   overflowY: 'auto',
   // position: 'absolute',
   // top: 0,
   // left: 0,
   // width: '100%',
   // height: '100%',
   // display: 'flex',
   // justifyContent: 'center',
   // alignItems: 'center',
   // background: 'rgba(0, 0, 0, 0.4)',
   // border: '1px solid black',

   // zIndex: 10000,
});
