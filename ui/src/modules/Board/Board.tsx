import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';

import {
   CssBoard,
   CssInteractiveScreen,
   CssColumnButton,
   Column,
   TasksList,
   useNewColumn,
} from '.';
import {
   useGetQuery,
   getQueryNames,
   useAppDispatch,
} from '../../library/common/hooks';
import { IBoard } from '../../library/interfaces';
import { setActiveBoardId, setEditMode } from '../../main/store';
import { EditTaskModal } from '../../library/common/components';

export const Board = () => {
   const dispatch = useAppDispatch();
   const { id } = useParams<string>();

   const boardDetails = getQueryNames.boardDetails;
   const { isLoading, error, data } = useGetQuery<IBoard>(boardDetails, id, {
      staleTime: 1000 * 60 * 20,
   });

   useEffect(() => {
      dispatch(setEditMode(false));

      if (id) {
         dispatch(setActiveBoardId(id));
      }
   }, [id]);

   const { createColumn } = useNewColumn(data?.columns.length);

   if (isLoading) return <Typography variant='h1'>...Loading</Typography>;

   const { columns } = data!;

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

         <CssColumnButton onClick={createColumn}>
            <Typography variant='h2'>+ New Column</Typography>
         </CssColumnButton>

         {/* Mocked props: change to use redux state */}
         <EditTaskModal />
      </CssBoard>
   );
};
