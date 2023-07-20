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
      boxShadow: '24',
      padding: '32px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      width: 300,

      [theme.breakpoints.up('sm')]: {
         width: '480px',
      },

      '& .MuiTypography-root': {
         marginBottom: '12px',
      },
   }),
);
