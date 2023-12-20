import { styled } from '@mui/system';
import { Accordion, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CssContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
   minHeight: '70vh',
}));

export const CssAccordion = styled(Accordion)(({ theme }) => ({
   color: theme.palette.text.secondary,

   '& .MuiAccordionSummary-root, & .MuiAccordionDetails-root': {
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3F2FD',
      borderRadius: '4px',
      border: '1px solid #90CAF9',
   },

   '& .MuiAccordionSummary-content > p': {
      fontSize: '14px',
   },

   '& .MuiAccordionSummary-root.Mui-expanded': {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
   },

   '& .MuiAccordionDetails-root': {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTop: 'unset',
   },
}));

export const CssDeleteIcon = styled(DeleteForeverIcon)(({ theme }) => ({
   color: theme.palette.error.main,
   marginLeft: 'auto',
   transition: `color 0.2s ease-out`,

   '&:hover': {
      color: theme.palette.error.light,
   },
}));
