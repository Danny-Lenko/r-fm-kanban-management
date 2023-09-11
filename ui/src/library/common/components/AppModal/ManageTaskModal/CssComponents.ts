import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const CssHeading = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '1rem',
   marginBottom: '12px',
   '& .MuiTypography-h3': {
      color: theme.palette.text.primary,
   },
}));
