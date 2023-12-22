import { Typography, Stack } from '@mui/material';

import { DeleteBtn, useMessage, useHandlers } from '.';
import { AppBtn } from '../../..';

export const DeleteModal: React.FC = () => {
   const { mode, handleDelete, handleClose } = useHandlers();
   const { message } = useMessage();

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
