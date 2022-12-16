import { useTheme } from '@mui/material/styles';
import Overlay from "../Overlay/Overlay";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { deleteModalStyles } from './deleteModalStyles';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Stack from '@mui/material/Stack';
import CustomBtn from '../CustomBtn/CustomBtn';
import { setDeletingBoard, setDeletingTask } from '../../../../main/slices/modalElsSlice';
import { setBoards, assignActiveBoard } from '../../../../main/slices/dataSlice';

const DeleteModal = () => {
   const theme = useTheme()
   const { deletingBoard } = useAppSelector(state => state.modals)
   const { activeBoard, activeColId, activeTaskId, boards } = useAppSelector(state => state.data)
   const activeCol = activeBoard.columns.find(col => col.id === activeColId)
   const activeTask = activeCol?.tasks.find(task => task.id === activeTaskId)
   const dispatch = useAppDispatch()

   function deleteBoardOrTask() {
      const boardsUpdated = deletingBoard
         ? boards.filter(board => board.id !== activeBoard.id).map( (board, i) => ({...board, id:i}) )
         : boards.map((board, i) => board.id !== activeBoard.id ? board : {
            ...board,
            columns: board.columns.map(col => col.id !== activeColId ? col : {
               ...col,
               tasks: col.tasks.filter(task => task.id !== activeTaskId).map( (task, i) => ({...task, id:i}) )
            })
         })

      dispatch( setBoards(boardsUpdated) )
      if (!deletingBoard) {
         dispatch( assignActiveBoard(activeBoard.id) )
      } else if (boards[1]) {
         dispatch(assignActiveBoard(0))
      }
      closeDeletingModal()
   }

   function closeDeletingModal() {
      dispatch( setDeletingBoard(false) )
      dispatch( setDeletingTask(false) )
   }
   
   return (
      <Overlay>
         <Paper elevation={0} sx={deleteModalStyles(theme)}>
            <Typography variant='h3'>
               {deletingBoard ? 'Delete this board?' : 'Delete this task?'}
            </Typography>
            <Typography variant='body1'>
               {
                  deletingBoard
                     ? `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
                     : `Are you sure you want to delete the ‘${activeTask?.title}’ task and its subtasks? This action cannot be reversed.`
               }
            </Typography>
            <Stack direction='row' spacing={2}>
               <CustomBtn
                  sizeSm={true}
                  color='destruct'
                  text='Delete'
                  onclick={deleteBoardOrTask}
               />
               <CustomBtn
                  sizeSm={true}
                  color='secondary'
                  text='Cancel'
                  onclick={closeDeletingModal}
               />
            </Stack>
         </Paper>
      </Overlay>
   );
}

export default DeleteModal;