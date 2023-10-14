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

import { ManagerCheckbox } from '../../ManageTaskModal';

interface Props {
   title: string;
   description: string;
   subtasks: ISubtask[];
   status: string;
}

export const EditTaskFormik: React.FC<Props> = ({
   title,
   description,
   subtasks,
   status,
}) => {
   const submit = (values: Values) => {};

   return (
      <Formik
         initialValues={{
            title,
            description,
            subtasks: subtasks.map((sub) => sub.title),
            // subtasks,
            status,
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

                  <ManagerCheckbox {...{ ...props, subtasks }} />
                  {/* <EditorSelect options={selectOptions} {...props} /> */}
                  <CssButton />
               </Form>
            );
         }}
      </Formik>
   );
};

{
   /* <Formik
initialValues={{
   title: data?.title,
   description: data!.description,
   subtasks: data!.subtasks.map((sub) => sub.title),
   status: data!.status,
}}
onSubmit={submit}
>
{(props) => {
   return (
      <Form>
         <EditorTitle {...props} />
         <EditorDescription {...props} />
         <EditorSubtasks {...props} />
         <EditorSelect options={selectOptions} {...props} />
         <AppBtn {...btnProps}>
            {taskIsExisting ? 'Save Changes' : 'Create Task'}
            {'Save Changes'}
         </AppBtn>
      </Form>
   );
}}
</Formik> */
}
