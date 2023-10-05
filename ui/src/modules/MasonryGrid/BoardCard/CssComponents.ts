import { Paper, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';

export const CssCard = styled(Paper)({
   cursor: 'pointer',
   zIndex: 100,
   boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
   padding: '24px 16px',

   '&:hover': {
      '& .MuiTypography-root.MuiTypography-h3': {
         '&::after': {
            background: '#000',
         },
      },
   },
});

export const CssTitle = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.primary,
   width: 'fit-content',

   position: 'relative',
   '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.background.paper,

      width: '100%',
      height: '1px',
      transition: 'background 0.3s ease-in-out',
   },
}));
CssTitle.defaultProps = {
   variant: 'h3',
   mb: 1,
};

export const CssSubtasks = styled(Typography)(({ theme }) => ({
   color: theme.palette.greyCustom[200],
   marginBottom: '4px',
}));
CssSubtasks.defaultProps = {
   variant: 'body2',
};

export const CssStack = styled(Stack)({});
CssStack.defaultProps = {
   direction: 'row',
   flexWrap: 'wrap',
   columnGap: '8px',
   rowGap: '0',
};
