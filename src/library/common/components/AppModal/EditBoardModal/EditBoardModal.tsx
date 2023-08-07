import { Form } from 'formik';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks';

import { BoardFormik, NameField, ColumnFields } from '.';

import { AppBtn } from '../../AppBtn';

export const EditBoardModal: React.FC = () => {
   const isExisting = useAppSelector((state) => state.modals.isExistingBoard);

   const buttonProps = {
      sx: {
         marginTop: 4,
      },
      fullWidth: true,
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      children: isExisting ? 'Save Changes' : 'Create New Board',
   };

   return (
      <>
         <Typography variant='h3'>
            {isExisting ? 'Edit board' : 'Add new board'}
         </Typography>

         <BoardFormik>
            {(props) => (
               <Form>
                  <NameField {...props} />
                  <ColumnFields {...props} />
                  <AppBtn {...buttonProps}></AppBtn>
               </Form>
            )}
         </BoardFormik>
      </>
   );
};
