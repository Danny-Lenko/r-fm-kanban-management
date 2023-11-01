import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box } from '@mui/material';

import { CssCard, CssTitle, CssSubtasks } from '.';
import {
   selectTaskModalExpansionId,
   setActiveTaskId,
} from '../../../../main/store';
import { ITask } from '../../../../library/interfaces/interfaces';
import {
   useAppDispatch,
   useAppSelector,
} from '../../../../library/common/hooks';
import { EditTaskModal } from '../../../../library/common/components';
import { setTaskModalExpansionId } from '../../../../main/store';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
   snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, subtasks, id, columnId, provided, snapshot }) => {
      // this expansionId ensures working animation
      const expansionId = useAppSelector(selectTaskModalExpansionId);
      const dispatch = useAppDispatch();

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = () => {
         dispatch(setActiveTaskId(id));
         dispatch(setTaskModalExpansionId(id));
      };

      const isDragging = snapshot.isDragging;

      return (
         <>
            <Box
               {...provided.dragHandleProps}
               {...provided.draggableProps}
               ref={provided.innerRef}
               sx={{
                  border: (theme) =>
                     snapshot.isDragging
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

            {/* <EditTaskModal isDragging={isDragging} title={title} /> */}
         </>
      );
   },
);
