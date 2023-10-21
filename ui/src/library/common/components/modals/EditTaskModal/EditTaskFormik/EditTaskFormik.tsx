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
   const submit = (values: Values) => {};

   return (
      <Formik
         initialValues={{
            title,
            description,
            subtasks: subtasks.map((sub) => sub.title),
            status,
            columnOptions,
         }}
         onSubmit={submit}
         validationSchema={editTaskSchema}
      >
         {(props) => {
            console.log(props);
            return (
               <Form>
                  <EditorTitle {...props} />
                  <EditorDescription {...props} />
                  <EditorSubtasks {...{ ...props, subtasks }} />
                  <EditorSelect {...{ ...props, columnOptions }} />
                  <CssButton />
               </Form>
            );
         }}
      </Formik>
   );
};
