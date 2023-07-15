import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
// import Overlay from '../../Overlay/Overlay';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import { deleteModalStyles, deleteBtnSx } from './deleteModalStyles';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
} from '../../../../../main/slices/modalElsSlice';
import {
   setBoards,
   assignActiveBoard,
} from '../../../../../main/slices/dataSlice';

import { Modal, Paper, Typography, Stack, Box, useTheme } from '@mui/material';

import { AppBtn } from '../..';

export const DeleteModal: React.FC = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { deletingBoard, deletingTask } = useAppSelector(
      (state) => state.modals,
   );
   const { activeBoard, activeColId, activeTaskId, boards } = useAppSelector(
      (state) => state.data,
   );

   const activeCol = activeBoard.columns.find((col) => col.id === activeColId);
   const activeTask = activeCol?.tasks.find((task) => task.id === activeTaskId);

   function deleteBoardOrTask() {
      const boardsUpdated = deletingBoard
         ? boards
              .filter((board) => board.id !== activeBoard.id)
              .map((board, i) => ({ ...board, id: i }))
         : boards.map((board, i) =>
              board.id !== activeBoard.id
                 ? board
                 : {
                      ...board,
                      columns: board.columns.map((col) =>
                         col.id !== activeColId
                            ? col
                            : {
                                 ...col,
                                 tasks: col.tasks
                                    .filter((task) => task.id !== activeTaskId)
                                    .map((task, i) => ({ ...task, id: i })),
                              },
                      ),
                   },
           );

      dispatch(setBoards(boardsUpdated));
      if (!deletingBoard) {
         dispatch(assignActiveBoard(activeBoard.id));
      } else {
         navigate('/');
         if (boards.length <= 1) {
            const zeroBoards = [
               { id: 0, name: 'Zero Board', columns: [], path: 'zero-board' },
            ];
            dispatch(setBoards(zeroBoards));
         }
         dispatch(assignActiveBoard(0));
      }
      closeDeletingModal();
   }

   function closeDeletingModal() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   return (
      // <Overlay>
      // <Modal open={deletingBoard || deletingTask} onClose={closeDeletingModal}>
         <Box sx={deleteModalStyles}>
            <Typography variant='h3'>
               {deletingBoard ? 'Delete this board?' : 'Delete this task?'}
            </Typography>
            <Typography variant='body1'>
               {deletingBoard
                  ? `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
                  : `Are you sure you want to delete the ‘${activeTask?.title}’ task and its subtasks? This action cannot be reversed.`}
            </Typography>
            <Stack direction='row' spacing={2}>
               <AppBtn
                  buttonSize='small'
                  sx={deleteBtnSx(theme)}
                  onClick={deleteBoardOrTask}
               >
                  Delete
               </AppBtn>
               <AppBtn
                  buttonSize='small'
                  color='secondary'
                  onClick={closeDeletingModal}
               >
                  Cancel
               </AppBtn>
            </Stack>
         </Box>
      // </Modal>
      // </Overlay>
   );
};
