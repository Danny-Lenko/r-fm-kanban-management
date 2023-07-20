import { Typography, Stack, useTheme } from '@mui/material';
// import { AppBtn } from '..';
import { AppBtn } from '../../AppBtn';
import { deleteBtnSx, DeleteBtn } from './deleteModalStyles';
import { useDeleteModal } from './useDeleteModal';

export const DeleteModal: React.FC = () => {
   const theme = useTheme();
   const { deletingBoard, activeBoard, activeTask, handleDelete, handleClose } =
      useDeleteModal();

   return (
      <>
         <Typography variant='h3'>
            {deletingBoard ? 'Delete this board?' : 'Delete this task?'}
         </Typography>
         <Typography variant='body1'>
            {deletingBoard
               ? `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
               : `Are you sure you want to delete the ‘${activeTask?.title}’ task and its subtasks? This action cannot be reversed.`}
         </Typography>
         <Stack direction='row' spacing={2}>
            <DeleteBtn
               buttonSize='small'
               // sx={deleteBtnSx(theme)}
               onClick={handleDelete}
               buttonsize={undefined}
            >
               Delete
            </DeleteBtn>
            <AppBtn buttonSize='small' color='secondary' onClick={handleClose}>
               Cancel
            </AppBtn>
         </Stack>
      </>
   );
};
