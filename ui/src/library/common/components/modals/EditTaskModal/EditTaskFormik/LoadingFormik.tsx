import { Form, Formik } from 'formik';

import { AppBtn } from '../../..';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
} from '..';

export const LoadingFormik = () => {
   const submit = (values: Values) => {};

   const btnProps = {
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      fullWidth: true,
      sx: { marginTop: 4 },
   };

   const loadingValues = {
      title: '...Loading',
      description: '...Loading',
      subtasks: ['...Loading', '...Loading'],
      status: '...Loading',
   };

   return (
      <Formik initialValues={loadingValues} onSubmit={submit}>
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
