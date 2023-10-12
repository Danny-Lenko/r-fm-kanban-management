import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box } from '@mui/material';

import { ITask } from '../../../../library/interfaces/interfaces';

import { CssCard, CssTitle, CssSubtasks } from '.';

import { ManageTaskModal } from '../../../../library/common/components/modals/ManageTaskModal';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
   snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, subtasks, id, columnId, provided, snapshot }) => {
      const [expandId, setExpandId] = useState<string | null>('');

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = () => {
         setExpandId(id);
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
               <CssCard
                  layoutId={id}
                  style={{
                     background: '#fff',
                  }}
                  onClick={handleExpand}
               >
                  <CssTitle>{title}</CssTitle>
                  <CssSubtasks>
                     {subtasks.length
                        ? `${completed} of ${subtasks.length} subtasks`
                        : 'no subtasks yet'}
                  </CssSubtasks>
               </CssCard>
            </Box>

            <ManageTaskModal
               expandId={expandId}
               setExpandId={setExpandId}
               isDragging={isDragging}
            />
         </>
      );
   },
);
