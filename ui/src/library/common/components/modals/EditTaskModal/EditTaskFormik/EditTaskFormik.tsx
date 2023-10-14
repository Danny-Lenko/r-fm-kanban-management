import { Form, Formik } from 'formik';

import { AppBtn } from '../../..';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
   editTaskSchema,
} from '..';

import { ISubtask } from '../../../../../interfaces';

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

   const btnProps = {
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      fullWidth: true,
      sx: { marginTop: 4 },
   };

   return (
      <Formik
         initialValues={{
            title,
            description,
            subtasks: subtasks.map((sub) => sub.title),
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
                  {/* <EditorSelect options={selectOptions} {...props} /> */}
                  <AppBtn {...btnProps}>
                     {/* {taskIsExisting ? 'Save Changes' : 'Create Task'} */}
                     {'Save Changes'}
                  </AppBtn>
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
