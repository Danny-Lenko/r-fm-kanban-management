import { styled } from '@mui/system';
import { Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CssContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
   minHeight: '70vh',
}));

export const CssDeleteIcon = styled(DeleteForeverIcon)(({ theme }) => ({
   color: theme.palette.error.main,
   marginLeft: 'auto',
   transition: `color 0.2s ease-out`,

   '&:hover': {
      color: theme.palette.error.light,
   },
}));
