import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import { usualBoardStyles } from './usualBoardStyles';
import { setBoards, assignActiveBoard } from '../../main/slices/dataSlice';
import { COLUMNCOLORS } from '../../library/common/constants';

const UsualBoard = () => {
   const theme = useTheme();
   const drawerOpen = useAppSelector((state) => state.drawer.open);
   const { activeBoard, boards } = useAppSelector((state) => state.data);
   const columns = activeBoard.columns;
   const dispatch = useAppDispatch();

   function addNewColumn() {
      const boardsUpdated = boards.map((board) =>
         board.id !== activeBoard.id
            ? board
            : {
                 ...board,
                 columns: [
                    ...board.columns,
                    {
                       id: board.columns.length,
                       name: `NewColumn${board.columns.length + 1}`,
                       tasks: [],
                       color: COLUMNCOLORS[board.columns.length]
                          ? COLUMNCOLORS[board.columns.length]
                          : '#E4EBFA',
                    },
                 ],
              },
      );

      dispatch(setBoards(boardsUpdated));
      dispatch(assignActiveBoard(activeBoard.id));
   }

   return (
      <Stack
         direction='row'
         sx={usualBoardStyles(theme, drawerOpen)}
         spacing={3}
      >
         <Stack className='cols-stack'>
            <Stack direction='row' spacing={3}>
               {columns.map((col) => (
                  <Stack key={col.name} className='rows-stack' spacing={2.5}>
                     <Stack direction='row' spacing={1}>
                        <Box
                           className='color'
                           style={{ backgroundColor: col.color }}
                        ></Box>
                        <Typography variant='h5'>
                           {col.name} ({col.tasks.length})
                        </Typography>
                     </Stack>
                     {col.tasks.map((task) => (
                        <TaskCard key={task.title} task={task} />
                     ))}
                  </Stack>
               ))}
               <Box>&nbsp;</Box>
            </Stack>
            <Box>&nbsp;</Box>
         </Stack>
         <Button className='add-col-btn' onClick={addNewColumn}>
            <Typography variant='h2'>+ New Column</Typography>
         </Button>
      </Stack>
   );
};

export default UsualBoard;
