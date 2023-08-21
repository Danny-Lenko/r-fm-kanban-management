import { styled } from '@mui/system';
import { FormControlLabel, Checkbox } from '@mui/material';

type Props = {
   subtask: {
      title: string;
      isCompleted: boolean;
   };
};

export const CssControlLabel = styled(FormControlLabel)<Props>(
   ({ theme, subtask }) => ({
      backgroundColor: theme.palette.background.default,
      margin: 0,
      marginTop: '8px',
      borderRadius: '4px',
      '&:hover': {
         backgroundColor: 'rgba(99, 95, 199, 0.25)',
      },

      '& .MuiTypography-root': {
         padding: '8px 0 8px 0',
         marginBottom: 0,
         fontSize: 12 / 16 + 'rem',
         fontWeight: 700,
         color: !subtask.isCompleted
            ? theme.palette.text.primary
            : theme.palette.greyCustom[200],
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
