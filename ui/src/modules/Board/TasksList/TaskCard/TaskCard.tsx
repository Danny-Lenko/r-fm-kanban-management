import React, { useEffect } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box } from '@mui/material';

import { CssCard, CssTitle, CssSubtasks } from '.';
import {
   selectTaskModalExpansionId,
   setActiveTaskId,
   setTaskCardWasDragged,
} from '../../../../main/store';
import { ITask } from '../../../../library/interfaces';
import {
   useAppDispatch,
   useAppSelector,
} from '../../../../library/common/hooks';
import { setTaskModalExpansionId } from '../../../../main/store';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
   snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, subtasks, id, columnId, provided, snapshot }) => {
      // this expansionId ensures working animation
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const expansionId = useAppSelector(selectTaskModalExpansionId);
      const { isDragging } = snapshot;
      const dispatch = useAppDispatch();

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = () => {
         dispatch(setActiveTaskId(id));
         dispatch(setTaskModalExpansionId(id));
      };

      useEffect(() => {
         if (isDragging) {
            dispatch(setTaskCardWasDragged(true));
         }
      }, [isDragging, dispatch]);

      return (
         <Box
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            sx={{
               border: (theme) =>
                  isDragging
                     ? `2px solid ${theme.palette.primary.main}`
                     : 'none',
            }}
         >
            <CssCard layoutId={id} onClick={handleExpand}>
               <CssTitle>{title}</CssTitle>
               <CssSubtasks>
                  {subtasks.length
                     ? `${completed} of ${subtasks.length} subtasks`
                     : 'no subtasks yet'}
               </CssSubtasks>
            </CssCard>
         </Box>
      );
   },
);
