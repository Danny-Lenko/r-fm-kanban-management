import { Typography, Stack } from '@mui/material';
import { AppBtn } from '../../../AppBtn';
import { DeleteBtn, useDeleteModal } from '.';
import { useAppSelector } from '../../../../hooks';
import { selectDeleteModalMode } from '../../../../../../main/store';

export const DeleteModal: React.FC = () => {
   const mode = useAppSelector(selectDeleteModalMode);
   const { boardDeleting, handleDelete, handleClose, name } = useDeleteModal();

   return (
      <>
         <Typography variant='h3'>
            {boardDeleting ? 'Delete this board?' : 'Delete this task?'}
         </Typography>
         <Typography variant='body1'>
            {boardDeleting ? (
               <>
                  Are you sure you want to delete the <b>‘${name}’</b> board?
                  This action will remove all columns and tasks and cannot be
                  reversed.
               </>
            ) : (
               <>
                  Are you sure you want to delete the <b>‘{name}’</b> task and
                  its subtasks? This action cannot be reversed.
               </>
            )}
         </Typography>
         <Stack direction='row' spacing={2}>
            <DeleteBtn buttonSize='small' onClick={handleDelete}>
               Delete
            </DeleteBtn>
            <AppBtn buttonSize='small' color='secondary' onClick={handleClose}>
               Cancel
            </AppBtn>
         </Stack>
      </>
   );
};
