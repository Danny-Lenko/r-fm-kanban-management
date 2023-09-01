import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CssCard = styled(Paper)({
   cursor: 'pointer',
   zIndex: 100,
   boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
   padding: '24px 16px',
});

export const CssTitle = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.primary,
}));
CssTitle.defaultProps = {
   variant: 'h4',
   mb: 1,
};

export const CssSubtasks = styled(Typography)(({ theme }) => ({
   color: theme.palette.greyCustom[200],
}));
CssSubtasks.defaultProps = {
   variant: 'body2',
};
