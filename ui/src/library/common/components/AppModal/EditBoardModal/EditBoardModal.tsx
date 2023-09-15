import { Form } from 'formik';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks';

import { AppBtn } from '../..';
import { BoardFormik, NameField, ColumnFields } from '.';
import { selectBoardIsExisting } from '../../../../../main/store';

export const EditBoardModal: React.FC = () => {
   const boardIsExisting = useAppSelector(selectBoardIsExisting);

   const buttonProps = {
      sx: {
         marginTop: 4,
      },
      fullWidth: true,
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      children: boardIsExisting ? 'Save Changes' : 'Create New Board',
   };

   return (
      <>
         <Typography variant='h3'>
            {boardIsExisting ? 'Edit board' : 'Add new board'}
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
