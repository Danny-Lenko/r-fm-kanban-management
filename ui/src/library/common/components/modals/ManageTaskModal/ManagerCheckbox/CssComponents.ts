import { styled } from '@mui/system';
import { FormControlLabel, Checkbox } from '@mui/material';

type Props = {
   completed: number | null;
};

export const CssControlLabel = styled(FormControlLabel)<Props>(
   ({ theme, completed }) => ({
      maxWidth: 'min-content',

      backgroundColor: theme.palette.background.default,
      margin: 0,
      borderRadius: '4px',
      marginRight: '8px',
      '&:hover': {
         backgroundColor: 'rgba(99, 95, 199, 0.25)',
      },
   }),
);

export const CssCheckbox = styled(Checkbox)(({ theme }) => ({
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
         color: theme.palette.primary.main,
      },
      '& ~ .MuiFormControlLabel-label': {
         textDecoration: 'line-through',
      },
   },
}));
