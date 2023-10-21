import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';

import { useGetQuery, dataTypeNames } from '../../library/common/hooks';

import { IBoard } from '../../library/interfaces';

import {
   CssBoard,
   CssInteractiveScreen,
   CssColumnButton,
   Column,
   // useNewColumn,
   TasksList,
} from '.';
import { useParams } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';

export const Board = () => {
   // const { columns, addNewColumn } = useNewColumn();
   const { id } = useParams<string>();

   const boardDetails = dataTypeNames.boardDetails;
   const { isLoading, error, data } = useGetQuery<IBoard>(boardDetails, id, {
      staleTime: 1000 * 60 * 20,
   });

   if (isLoading) return <Typography variant='h1'>...Loading</Typography>;

   console.log(data);

   const { columns } = data!;
   const columnNames = columns.map((column) => column.name);

   

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

         <CssColumnButton
         // onClick={addNewColumn}
         >
            <Typography variant='h2'>+ New Column</Typography>
         </CssColumnButton>
      </CssBoard>
   );
};
