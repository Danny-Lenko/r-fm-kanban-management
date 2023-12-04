import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';

import {
   CssColumn,
   CssColorLabel,
   CssTaskButton,
   CssNameContainer,
   CssName,
} from '.';
import { useAppDispatch } from '../../../library/common/hooks';
import { setTaskAdding, setTaskAddingColumn } from '../../../main/store';

interface Props {
   name: string;
   color: string;
   tasksNum: number;
   children: React.ReactNode;
   provided: DraggableProvided;
}

export const Column: React.FC<Props> = React.memo(
   ({ name, color, tasksNum, children, provided }) => {
      const dispatch = useAppDispatch();

      const handleAddTask = () => {
         dispatch(setTaskAdding(true));
         dispatch(setTaskAddingColumn(name));
      };

      return (
         <CssColumn
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
         >
            <Stack direction='row' spacing={1}>
               <CssColorLabel color={color} />
               <CssNameContainer>
                  <CssName>{name}</CssName> ({tasksNum})
               </CssNameContainer>
            </Stack>
            {children}
            <CssTaskButton
               children='+ add task'
               tasksnum={tasksNum}
               onClick={handleAddTask}
            />
         </CssColumn>
      );
   },
);
