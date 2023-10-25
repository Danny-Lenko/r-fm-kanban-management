import { Form, Formik } from 'formik';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
   editTaskSchema,
} from '..';
import { CssButton } from '.';

import { ISubtask } from '../../../../../interfaces';
import { Stack } from '@mui/material';

interface Props {
   title: string;
   description: string;
   subtasks: ISubtask[];
   status: string;
   columnOptions: string[];
}

export const EditTaskFormik: React.FC<Props> = ({
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
         onSubmit={(values) => submit(values)}
         validationSchema={editTaskSchema}
      >
         {(props) => {
            console.log(props.dirty);
            return (
               <Form>
                  <EditorTitle {...props} />
                  <EditorDescription {...props} />
                  <EditorSubtasks {...{ ...props, subtasks }} />
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
