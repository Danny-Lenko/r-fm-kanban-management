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
import { CssButton } from '.';

import { ISubtask } from '../../../../../interfaces';
import { Stack } from '@mui/material';

export const EditTaskFormik: React.FC<FormValues> = ({
   title,
   description,
   subtasks,
   status,
   columnOptions,
}) => {
   const submit = (values: Values) => {
      console.log(values);
   };

   return (
      <Formik
         initialValues={{
            title,
            description,
            // subtasks: subtasks.map((sub) => sub.title),
            subtasks: subtasks,
            status,
            columnOptions,
         }}
         onSubmit={submit}
         validationSchema={editTaskSchema}
      >
         {(props) => {
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
