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
import {
   selectActiveBoard,
   selectTaskIsExisting,
} from '../../../../../main/store';

export const EditAddTaskModal = () => {
   const taskIsExisting = useAppSelector(selectTaskIsExisting);

   const activeBoard = useAppSelector(selectActiveBoard)!;
   const { columns } = activeBoard;
   const selectOptions = columns.map((col) => col.name);

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
            {taskIsExisting ? 'Edit task' : 'Add new task'}
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
                        {taskIsExisting ? 'Save Changes' : 'Create Task'}
                     </AppBtn>
                  </Form>
               );
            }}
         </EditorFormik>
      </>
   );
};
