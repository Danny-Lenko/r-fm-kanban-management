import { Form, Formik } from 'formik';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   Values,
} from '..';

import { CssButton } from '.';

export const LoadingFormik = () => {
   const submit = (values: Values) => {};

   const loadingValues = {
      title: '...Loading',
      description: '...Loading',
      subtasks: [
         {
            id: 'id',
            title: '...Loading',
            // description: 'loading',
            // status: 'loading',
            isCompleted: false,
         },
      ],
      status: '...Loading',
   };

   return (
      <Formik initialValues={loadingValues} onSubmit={submit}>
         {(props) => {
            return (
               <Form>
                  <EditorTitle {...props} />
                  <EditorDescription {...props} />
                  {/* <EditorSubtasks {...props} /> */}
                  {/* <EditorSelect options={selectOptions} {...props} /> */}
                  <CssButton />
               </Form>
            );
         }}
      </Formik>
   );
};
