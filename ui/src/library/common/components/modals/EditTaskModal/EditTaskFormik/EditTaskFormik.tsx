import { Form, Formik } from 'formik';
import { Stack, CircularProgress } from '@mui/material';

import { CssButton, useSaveChanges, CssSavingText } from '.';
import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
   editTaskSchema,
   FormValues,
} from '..';
import { Error } from '../../..';
import { useAppSelector } from '../../../../hooks';
import { selectActiveBoardId } from '../../../../../../main/store';

export const EditTaskFormik: React.FC<FormValues> = ({
   id,
   title,
   description,
   subtasks,
   status,
   columnOptions,
}) => {
   const { saveChanges, isError } = useSaveChanges(id!);
   const boardId = useAppSelector(selectActiveBoardId);

   const submit = (values: Values, boardId: string) => {
      saveChanges(values, boardId);
   };

   if (isError)
      return (
         <Error>
            {
               'Your changes were not saved. Please check your internet connection and try again.'
            }
         </Error>
      );

   return (
      <Formik
         initialValues={{
            title,
            description,
            subtasks: subtasks,
            status,
            columnOptions,
         }}
         onSubmit={(values) => {
            submit(values, boardId);
         }}
         validationSchema={editTaskSchema}
         enableReinitialize
      >
         {(props) => {
            const { dirty, isSubmitting, resetForm } = props;
            return (
               <Form>
                  <EditorTitle {...props} />
                  <EditorDescription {...props} />
                  <EditorSubtasks {...props} />
                  <EditorSelect {...{ ...props, columnOptions }} />
                  <Stack direction='row' gap={1}>
                     <CssButton disabled={!dirty || isSubmitting}>
                        {isSubmitting ? (
                           <>
                              <CircularProgress size={20} />
                              <CssSavingText>{'Saving...'}</CssSavingText>
                           </>
                        ) : (
                           'save changes'
                        )}
                     </CssButton>
                     <CssButton
                        type='button'
                        disabled={!dirty || isSubmitting}
                        onClick={() => resetForm()}
                        children={'reset form'}
                        color='warning'
                     />
                  </Stack>
               </Form>
            );
         }}
      </Formik>
   );
};
