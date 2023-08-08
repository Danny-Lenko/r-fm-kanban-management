import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

export const Heading = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '1rem',
   marginBottom: '12px',
   '& .MuiTypography-h3': {
      color: theme.palette.text.primary,
   },
}));

export const SubtasksHeading = styled(Typography)(({ theme }) => ({
   color:
      theme.palette.mode === 'light'
         ? theme.palette.greyCustom[200]
         : theme.palette.common.white,
   marginBottom: '8px !important',
}));
