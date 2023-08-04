import { Form } from 'formik';
import { Typography } from '@mui/material';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   EditorFormik,
} from '.';
import { AppBtn } from '../..';

import { useAppSelector } from '../../../hooks';

export const EditAddTaskModal = () => {
   const cols = useAppSelector((state) => state.data.activeBoard.columns);
   const isExisting = useAppSelector((state) => state.modals.isExistingTask);

   const selectOptions = cols.map((col) => col.name);

   const btnProps = {
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      fullWidth: true,
      sx: { marginTop: 4 },
   };

   return (
      <>
         <Typography variant='h3'>
            {isExisting ? 'Edit task' : 'Add new task'}
         </Typography>

         <EditorFormik>
            {(props) => {
               return (
                  <Form>
                     <EditorTitle {...props} />
                     <EditorDescription {...props} />
                     <EditorSubtasks {...props} />
                     <EditorSelect options={selectOptions} {...props} />
                     <AppBtn {...btnProps}>
                        {isExisting ? 'Save Changes' : 'Create Task'}
                     </AppBtn>
                  </Form>
               );
            }}
         </EditorFormik>
      </>
   );
};
