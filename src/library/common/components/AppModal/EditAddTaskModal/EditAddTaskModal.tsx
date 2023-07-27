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
import { editorStyles, btnSx } from './editorStyles';

export const EditAddTaskModal = () => {
   const cols = useAppSelector((state) => state.data.activeBoard.columns);
   const isExisting = useAppSelector((state) => state.modals.isExistingTask);

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

                     <EditorSelect
                        value={props.values.status}
                        onChange={props.handleChange}
                        cols={cols}
                     />

                     <AppBtn
                        type='submit'
                        buttonSize='small'
                        color='primary'
                        sx={btnSx}
                     >
                        {isExisting ? 'Save Changes' : 'Create Task'}
                     </AppBtn>
                  </Form>
               );
            }}
         </EditorFormik>
      </>
   );
};
