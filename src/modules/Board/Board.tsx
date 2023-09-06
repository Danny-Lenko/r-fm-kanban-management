import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography, Stack } from '@mui/material';

import {
   CssBoard,
   CssInteractiveScreen,
   CssColumn,
   CssColorLabel,
   CssColumnButton,
   TaskCard,
   useNewColumn,
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
                              <CssColumn
                                 key={name}
                                 spacing={2.5}
                                 {...provided.dragHandleProps}
                                 {...provided.draggableProps}
                                 ref={provided.innerRef}
                              >
                                 <Stack direction='row' spacing={1}>
                                    <CssColorLabel color={color} />
                                    <Typography
                                       {...{
                                          variant: 'h5',
                                          textTransform: 'uppercase',
                                       }}
                                    >
                                       {name} ({tasks.length})
                                    </Typography>
                                 </Stack>
                                 {tasks.map((task) => (
                                    <TaskCard key={task.title} {...{...task, columnId: id }} />
                                 ))}
                              </CssColumn>
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
