import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';

import {
   CssBoard,
   CssInteractiveScreen,
   CssColumnButton,
   Column,
   useNewColumn,
   TasksList,
} from '.';

export const Board = () => {
   const { columns, addNewColumn } = useNewColumn();

   return (
      <CssBoard>
         <Droppable droppableId='columns' type='columns' direction='horizontal'>
            {(provided) => (
               <CssInteractiveScreen
                  {...provided.droppableProps}
                  ref={provided.innerRef}
               >
                  {columns.map((col, index) => {
                     const { name, color, tasks, id } = col;

                     return (
                        <Draggable draggableId={id} index={index} key={id}>
                           {(provided) => (
                              <Column
                                 {...{
                                    name,
                                    color,
                                    tasksNum: tasks.length,
                                    provided,
                                 }}
                              >
                                 <TasksList {...{ columnId: id, tasks }} />
                              </Column>
                           )}
                        </Draggable>
                     );
                  })}
                  {provided.placeholder}
               </CssInteractiveScreen>
            )}
         </Droppable>

         <CssColumnButton onClick={addNewColumn}>
            <Typography variant='h2'>+ New Column</Typography>
         </CssColumnButton>
      </CssBoard>
   );
};
