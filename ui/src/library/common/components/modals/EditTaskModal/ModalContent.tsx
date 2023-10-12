import { Form } from 'formik';
import { Typography } from '@mui/material';

import { dataTypeNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

import { AppBtn } from '../..';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   EditorFormik,
} from '.';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   // if (isLoading) return <h1>...Loading</h1>;

   // if (error) return <h1>Error</h1>;

   // const { title, description } = data!;

   console.log(data);

   const btnProps = {
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      fullWidth: true,
      sx: { marginTop: 4 },
   };

   return (
      <>
         {/* <Typography variant='h3'>
            {taskIsExisting ? 'Edit task' : 'Add new task'}
         </Typography> */}

         <EditorFormik>
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
         </EditorFormik>
      </>
   );
};
