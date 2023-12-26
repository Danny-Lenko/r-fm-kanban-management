import { Form } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';

import { BoardFormik, NameField, ColumnFields, CssButton } from '.';
import { useAppSelector, putQueryNames, usePutQuery } from '../../../../hooks';
import { selectActiveBoardId } from '../../../../../../main/store';
import { LoadingOverlay } from '../../../LoadingOverlay/LoadingOverlay';

interface SubmitColumn {
   id?: string;
   name: string;
}
interface SubmitValues {
   name: string;
   columns: SubmitColumn[];
}

export const BoardCreate: React.FC = () => {
   // const boardId = useAppSelector(selectActiveBoardId);

   const queryClient = useQueryClient();
   const dataType = putQueryNames.updateBoardById;
   // const { mutateAsync, isLoading, isError } = usePutQuery<SubmitValues, void>(
   //    dataType,
   //    boardId,
   // );

   // const saveChanges = async (values: SubmitValues) => {
   //    await mutateAsync(
   //       { ...values },
   //       {
   //          onSuccess: (data) => {
   //             queryClient.invalidateQueries(
   //                ['boards', boardId, 'with-details'],
   //                {
   //                   exact: true,
   //                },
   //             );
   //          },
   //       },
   //    );
   // };

   return (
      <>
         <Typography variant='h3'>{'Edit board'}</Typography>

         <BoardFormik saveChanges={() => console.log('CREATE')}>
            {(props) => (
               <Form>
                  <NameField {...props} />
                  <ColumnFields {...props} />
                  <CssButton disabled={!props.dirty || props.isSubmitting}>
                     {'Save Changes'}
                  </CssButton>

                  {props.isSubmitting && <LoadingOverlay />}
               </Form>
            )}
         </BoardFormik>
      </>
   );
};
