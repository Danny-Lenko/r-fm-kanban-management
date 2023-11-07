import { Form, Formik } from 'formik';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
   editTaskSchema,
   FormValues,
} from '..';
import { CssButton, useSaveChanges } from '.';

import { Stack } from '@mui/material';
import { useAppSelector } from '../../../../hooks';
import { selectActiveBoardId } from '../../../../../../main/store';

interface SubmitValues extends Values {
   boardId: string;
}

export const EditTaskFormik: React.FC<FormValues> = ({
   id,
   title,
   description,
   subtasks,
   status,
   columnOptions,
}) => {
   const { saveChanges } = useSaveChanges(id!);
   const boardId = useAppSelector(selectActiveBoardId);

   // const boardId = 'aasdfj-asdlf-asdf';

   // console.log(subtasks);

   const submit = (values: Values, boardId: string) => {
      saveChanges(values, boardId);
   };

   const reset = (values: Values) => {
      console.log(values.subtasks);
   };

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
         onReset={reset}
         enableReinitialize
      >
         {(props) => {
            console.log(props);
            return (
               <Form>
                  <EditorTitle {...props} />
                  <EditorDescription {...props} />
                  <EditorSubtasks {...props} />
                  <EditorSelect {...{ ...props, columnOptions }} />
                  <Stack direction='row' gap={1}>
                     <CssButton disabled={!props.dirty} />
                     <CssButton
                        type='button'
                        disabled={!props.dirty}
                        onClick={() => props.resetForm()}
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
