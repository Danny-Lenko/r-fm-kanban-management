import { useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import {
   AccordionDetails,
   AccordionSummary,
   Stack,
   Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';

import { BoardCard, CssAccordion, CssContainer } from '.';

import { useCategories } from '../AllBoards';
import { useNavigate } from 'react-router-dom';

const gridColumns = {
   xs: 1,
   sm: 2,
   md: 3,
   lg: 4,
   xl: 5,
};

export const MasonryGrid = () => {
   const categories = useCategories();
   const navigate = useNavigate();

   const handleBoardDoubleClick = useCallback((id: string) => {
      navigate(`/boards/${id}`);
   }, []);

   return (
      <>
         <CssContainer>
            <Masonry columns={gridColumns} spacing={3}>
               {categories.map(({ category, boards }, i) => (
                  <Paper elevation={0} key={crypto.randomUUID()}>
                     <CssAccordion elevation={0} defaultExpanded={i === 0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography>{category}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Stack gap={2}>
                              {boards.map((board) => (
                                 <BoardCard
                                    key={board.id}
                                    board={board}
                                    onDoubleClick={() =>
                                       handleBoardDoubleClick(board.id)
                                    }
                                 />
                              ))}
                           </Stack>
                        </AccordionDetails>
                     </CssAccordion>
                  </Paper>
               ))}
            </Masonry>
         </CssContainer>
      </>
   );
};
