import { styled } from '@mui/system';
import { Accordion } from '@mui/material';
import { AppBtn } from '../../../library/common/components';

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

export const CssCreateButton = styled(AppBtn)(({ theme }) => ({
   color: 'black',
   width: '100%',
   padding: '22px 0',
   marginTop: 12,
   background: '#cbe7fb',
   border: '#90CAF9 1px solid',
   borderRadius: 4,
}));
