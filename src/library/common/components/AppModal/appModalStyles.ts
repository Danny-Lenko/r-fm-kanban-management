import { styled } from '@mui/system';
import { Paper, PaperProps } from '@mui/material';

export const StyledContent = styled(Paper)<PaperProps>(
   ({ theme, ...rest }) => ({
      textTransform: 'capitalize',
      fontWeight: 700,
      position: 'absolute',
      top: '50%',
      left: '50%',
      border: '2px solid #000',
      borderRadius: '8px',
      boxShadow: '24',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      width: 300,
      padding: '24px',

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
   }),
);
