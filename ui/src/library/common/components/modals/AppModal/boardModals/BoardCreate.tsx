import { Form } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';

import { FormikCreate, NameField, ColumnFields, CssButton } from '.';
import { LoadingOverlay } from '../../../LoadingOverlay/LoadingOverlay';
import {
   postQueryNames,
   usePostQuery,
} from '../../../../hooks/api/usePostQuery';
import { setBoardCreating } from '../../../../../../main/store';
import { useAppDispatch } from '../../../../hooks';

interface SubmitColumn {
   id?: string;
   name: string;
}
interface SubmitValues {
   name: string;
   category: string;
   columns: SubmitColumn[];
}

export const BoardCreate: React.FC = () => {
   const dispatch = useAppDispatch();

   const queryClient = useQueryClient();
   const dataType = postQueryNames.newBoard;
   const { mutateAsync, isLoading, isError } = usePostQuery<SubmitValues, void>(
      dataType,
   );
   const saveChanges = async (values: SubmitValues) => {
      await mutateAsync(
         { ...values },
         {
            onSuccess: async (data) => {
               await queryClient.invalidateQueries(
                  ['boards', 'by-categories'],
                  {
                     exact: true,
                  },
               );

               dispatch(setBoardCreating(false));
            },
         },
      );
   };

   return (
      <>
         <Typography variant='h3'>{`Create new board`}</Typography>

         <FormikCreate saveChanges={saveChanges}>
            {(props) => (
               <Form>
                  <NameField {...props} />
                  <ColumnFields {...props} />
                  <CssButton disabled={!props.dirty || props.isSubmitting}>
                     {'Create Board'}
                  </CssButton>

                  {props.isSubmitting && <LoadingOverlay />}
               </Form>
            )}
         </FormikCreate>
      </>
   );
};
