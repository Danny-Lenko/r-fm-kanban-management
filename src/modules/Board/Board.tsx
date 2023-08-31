import { Typography, Stack } from '@mui/material';

import TaskCard from './TaskCard';

import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { setBoards, assignActiveBoard } from '../../main/slices/dataSlice';
import { COLUMNCOLORS } from '../../library/common/constants';

import {
   CssBoard,
   CssScrollable,
   CssInteractiveScreen,
   CssColumn,
   CssColorLabel,
   CssColumnButton,
} from '.';

export const Board = () => {
   const { activeBoard, boards } = useAppSelector((state) => state.data);
   const { columns } = activeBoard;
   const dispatch = useAppDispatch();

   function addNewColumn() {
      const boardsUpdated = boards.map((board) => {
         const { id, columns } = board;

         return id !== activeBoard.id
            ? board
            : {
                 ...board,
                 columns: [
                    ...board.columns,
                    {
                       id: columns.length,
                       name: `NewColumn${columns.length + 1}`,
                       tasks: [],
                       color: COLUMNCOLORS[columns.length]
                          ? COLUMNCOLORS[columns.length]
                          : '#E4EBFA',
                    },
                 ],
              };
      });

      dispatch(setBoards(boardsUpdated));
      dispatch(assignActiveBoard(activeBoard.id));
   }

   return (
      <CssBoard>
         <CssScrollable>
            <CssInteractiveScreen>
               {columns.map((col) => {
                  const { name, color, tasks } = col;

                  return (
                     <CssColumn key={name} spacing={2.5}>
                        <Stack direction='row' spacing={1}>
                           <CssColorLabel color={color} />
                           <Typography
                              {...{ variant: 'h5', textTransform: 'uppercase' }}
                           >
                              {name} ({tasks.length})
                           </Typography>
                        </Stack>
                        {tasks.map((task) => (
                           <TaskCard key={task.title} task={task} />
                        ))}
                     </CssColumn>
                  );
               })}
            </CssInteractiveScreen>
         </CssScrollable>

         <CssColumnButton onClick={addNewColumn}>
            <Typography variant='h2'>+ New Column</Typography>
         </CssColumnButton>
      </CssBoard>
   );
};
