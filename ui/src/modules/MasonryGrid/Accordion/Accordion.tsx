import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccordionDetails, Stack, Paper } from '@mui/material';

import { BoardCard, CssAccordion, Summary } from '..';
import { ICategory } from '../..';

interface Props {
   category: ICategory;
   idx: number;
}

export const Accordion: React.FC<Props> = ({ category: cat, idx }) => {
   const navigate = useNavigate();

   const { category, boards } = cat;

   const handleBoardDoubleClick = useCallback((id: string) => {
      navigate(`/boards/${id}`);
   }, []);

   return (
      <Paper elevation={0}>
         <CssAccordion
            elevation={0}
            // defaultExpanded={idx === 0}
            // TransitionProps={{ unmountOnExit: true }}
         >
            <Summary category={category} />
            <AccordionDetails>
               <Stack gap={2}>
                  {boards.map((board) => (
                     <BoardCard
                        key={board.id}
                        board={board}
                        onDoubleClick={() => handleBoardDoubleClick(board.id)}
                     />
                  ))}
               </Stack>
            </AccordionDetails>
         </CssAccordion>
      </Paper>
   );
};
