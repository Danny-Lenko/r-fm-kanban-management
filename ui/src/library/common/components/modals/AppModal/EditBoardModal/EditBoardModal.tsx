import { Form } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

import { Typography } from '@mui/material';

import { BoardFormik, NameField, ColumnFields } from '.';
import { AppBtn } from '../../..';
import { useAppSelector, putQueryNames, usePutQuery } from '../../../../hooks';
import {
   selectActiveBoardId,
   selectBoardIsExisting,
} from '../../../../../../main/store';

interface SubmitColumn {
   id?: string;
   name: string;
}

interface SubmitValues {
   name: string;
   columns: SubmitColumn[];
}

export const EditBoardModal: React.FC = () => {
   // const boardIsExisting = useAppSelector(selectBoardIsExisting);
   const boardId = useAppSelector(selectActiveBoardId);

   const queryClient = useQueryClient();
   const dataType = putQueryNames.updateBoardById;
   const { mutateAsync, isLoading, isError } = usePutQuery<SubmitValues, void>(
      dataType,
      boardId,
   );
   const saveChanges = async (values: SubmitValues) => {
      await mutateAsync(
         { ...values },
         {
            onSuccess: (data) => {
               queryClient.invalidateQueries(
                  ['boards', boardId, 'with-details'],
                  {
                     exact: true,
                  },
               );
            },
         },
      );
   };

   console.log(isLoading);

   const buttonProps = {
      sx: {
         marginTop: 4,
      },
      fullWidth: true,
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      // children: boardIsExisting ? 'Save Changes' : 'Create New Board',
   };

   return (
      <>
         {/* <Typography variant='h3'>
            {boardIsExisting ? 'Edit board' : 'Add new board'}
         </Typography> */}

         <BoardFormik saveChanges={saveChanges}>
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
