import { Form } from 'formik';
import { Typography } from '@mui/material';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   AdderSubtasks,
   AdderFormik,
   CssButton,
} from '.';
import { getQueryNames, useAppSelector, useGetQuery } from '../../../../hooks';
import {
   selectActiveBoardId,
   selectTaskAddingColumn,
} from '../../../../../../main/store';
import { IBoard } from '../../../../../interfaces';

export const AddTaskModal = () => {
   const taskAddingColumn = useAppSelector(selectTaskAddingColumn);
   const id = useAppSelector(selectActiveBoardId);
   const boardDetails = getQueryNames.boardDetails;
   const { isLoading, error, data } = useGetQuery<IBoard>(boardDetails, id, {
      staleTime: 1000 * 60 * 20,
   });
   const columns = data?.columns;
   const selectOptions = columns?.map((column) => column.name);

   return (
      <>
         <Typography variant='h3'>{'Add New Task'}</Typography>

         <AdderFormik>
            {(props) => {
               return (
                  <Form>
                     <EditorTitle {...props} />
                     <EditorDescription {...props} />
                     <AdderSubtasks {...props} />
                     {!taskAddingColumn && selectOptions && (
                        <EditorSelect options={selectOptions} {...props} />
                     )}
                     <CssButton>{'Create Task'}</CssButton>
                  </Form>
               );
            }}
         </AdderFormik>
      </>
   );
};
