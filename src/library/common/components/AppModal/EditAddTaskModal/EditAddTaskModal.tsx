import { Paper, Typography } from '@mui/material';

import { Form, FormikProps, FormikValues } from 'formik';

import { editorStyles, btnSx } from './editorStyles';

import {
   EditorTitleField,
   EditorDescriptionField,
   EditorSelectField,
   EditorSubtasksFieldArr,
   EditorFormik,
} from '.';
import { AppBtn } from '../..';
import { useAppSelector } from '../../../hooks';

export const EditAddTaskModal = () => {
   const cols = useAppSelector((state) => state.data.activeBoard.columns);
   const isExisting = useAppSelector((state) => state.modals.isExistingTask);

   return (
      // <Overlay>
      // <Paper elevation={0} sx={editorStyles(theme)}>

      <>
         <Typography variant='h3'>
            {isExisting ? 'Edit task' : 'Add new task'}
         </Typography>

         <EditorFormik>
            {(props) => {
               const editorTitleProps = {
                  value: props.values.title,
                  onChange: props.handleChange,
                  error: props.touched.title && !!props.errors.title,
                  helperText: props.touched.title && props.errors.title,
               };
               return (
                  <Form>
                     <EditorTitleField
                        // value={props.values.title}
                        // onChange={props.handleChange}
                        // error={
                        //    props.touched.title && Boolean(props.errors.title)
                        // }
                        // helperText={props.touched.title && props.errors.title}
                        {...editorTitleProps}
                     />

                     <EditorDescriptionField
                        value={props.values.description}
                        onChange={props.handleChange}
                        error={
                           props.touched.description &&
                           Boolean(props.errors.description)
                        }
                        helperText={
                           props.touched.description && props.errors.description
                        }
                     />

                     <EditorSubtasksFieldArr
                        subtasks={props.values.subtasks}
                        value={props.values.subtasks}
                        onChange={props.handleChange}
                        tochedSubtasks={props.touched.subtasks}
                        errorsSubtasks={props.errors.subtasks}
                     />

                     <EditorSelectField
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
      // </Paper>
      // </Overlay>
   );
};
