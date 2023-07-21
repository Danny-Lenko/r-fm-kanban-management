import { styled } from '@mui/system';
import { Box, Typography, FormControlLabel } from '@mui/material';

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

export const StyledControlLabel = styled(FormControlLabel)(({ theme, subtask }) => ({
   color:
      theme.palette.mode === 'light'
         ? theme.palette.greyCustom[200]
         : theme.palette.common.white,
   marginBottom: '8px !important',
}));

export const assembleCheckboxStyles = (subtask: any, theme: any) => ({
   backgroundColor: theme.palette.background.default,
   m: 0,
   mt: 1,
   borderRadius: 1,
   '&:hover': {
      backgroundColor: 'rgba(99, 95, 199, 0.25)',
   },
   '& .MuiCheckbox-root': {
      '& .MuiSvgIcon-root': {
         fontSize: '16px',
         color: theme.palette.divider,
         backgroundColor: theme.palette.background.paper,
         '& path': {
            transform: 'translate(-4px, -4px) scale(1.35)',
         },
      },
      '&.Mui-checked': {
         '& .MuiSvgIcon-root': {
            color: 'primary.main',
         },
         '& ~ .MuiFormControlLabel-label': {
            textDecoration: 'line-through',
         },
      },
   },
   '& .MuiTypography-root': {
      py: 1,
      mb: 0,
      fontSize: 12 / 16 + 'rem',
      fontWeight: 700,
      color: !subtask.isCompleted
         ? theme.palette.text.primary
         : 'greyCustom.200',
   },
});
