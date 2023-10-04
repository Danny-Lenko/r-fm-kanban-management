import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useCategories } from '../AllBoards';

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   color: theme.palette.text.secondary,

   // '& .Mui-expanded': {
   //    '& .MuiAccordionSummary-root': {
   //       border: '1px solid black',
   //    },
   // },

   '& .MuiAccordionSummary-root.Mui-expanded': {
      // border: '1px solid black',
      background: 'lightgrey',
   },
}));

const boxSx = {
   // border: '1px solid black',
   display: 'flex',
   justifyContent: 'center',
   px: '8px',
   pt: '24px',
   minHeight: '50vh',
};

const gridColumns = {
   xs: 1,
   sm: 2,
   md: 3,
   lg: 4,
   xl: 5,
};

export const MasonryGrid = () => {
   const categories = useCategories();

   console.log(categories);

   return (
      <>
         <Box sx={boxSx}>
            <Masonry columns={gridColumns} spacing={3}>
               {categories.map(({ category, boards }, i) => (
                  <Paper key={crypto.randomUUID()}>
                     <StyledAccordion defaultExpanded={i === 0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography>{category}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>Contents</AccordionDetails>
                     </StyledAccordion>
                  </Paper>
               ))}
            </Masonry>
         </Box>
      </>
   );
};
