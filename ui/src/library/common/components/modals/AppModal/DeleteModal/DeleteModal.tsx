import { Typography, Stack } from '@mui/material';
import { AppBtn } from '../../../AppBtn';
import { DeleteBtn, useDeleteModal } from '.';
import {
   deleteQueryNames,
   getQueryNames,
   useAppSelector,
} from '../../../../hooks';
import { selectDeleteModalMode } from '../../../../../../main/store';
import { useModalMessage } from './useModalMessage';

export const DeleteModal: React.FC = () => {
   const mode = useAppSelector(selectDeleteModalMode);
   const { boardDeleting, handleDelete, handleClose } = useDeleteModal();

   const { message } = useModalMessage(mode || 'category');

   return (
      <>
         <Typography variant='h3'>{'Delete this ' + mode + '?'}</Typography>
         <Typography variant='body1'>{message}</Typography>
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
