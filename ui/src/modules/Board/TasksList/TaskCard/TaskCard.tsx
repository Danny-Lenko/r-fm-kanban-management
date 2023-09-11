import React, { useCallback } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import { ITask } from '../../../../library/interfaces/interfaces';
import { useAppDispatch } from '../../../../library/common/hooks';
import {
   setActiveColumndId,
   setActiveTaskId,
   setTaskManaging,
} from '../../../../main/store';

import { CssCard, CssTitle, CssSubtasks } from '.';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, completedSubtasks, subtasks, id, columnId, provided }) => {
      const dispatch = useAppDispatch();

      const handleClick = useCallback(() => {
         dispatch(setActiveColumndId(columnId));
         dispatch(setActiveTaskId(id));
         dispatch(setTaskManaging(true));
      }, [columnId, id]);

      return (
         <CssCard
            onClick={handleClick}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
         >
            <CssTitle>{title}</CssTitle>
            <CssSubtasks>
               {completedSubtasks} of {subtasks.length} subtasks
            </CssSubtasks>
         </CssCard>
      );
   },
);
