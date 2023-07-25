// import Overlay from '../Overlay/Overlay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Form, FormikProps, FormikValues } from 'formik';
// import TitleField from './EditorTitleField/EditorTitleField';
import DescriptionField from './EditorDescriptionField/EditorDescriptionField';
import SubtasksFieldArr from './EditorSubtasksFieldArr';
import SelectField from './EditorSelectField/EditorSelectField';
import EditorFormik from './EditorFormik/EditorFormik';

import { editorStyles, btnSx } from './editorStyles';

import { EditorTitleField } from './EditorTitleField';
import { AppBtn } from '../..';
import { useAppSelector } from '../../../hooks';

export const EditAddTaskModal = () => {
   const cols = useAppSelector((state) => state.data.activeBoard.columns);
   const isExisting = useAppSelector((state) => state.modals.isExistingTask);
   const theme = useTheme();

   return (
      // <Overlay>
      // <Paper elevation={0} sx={editorStyles(theme)}>

      <>
         <Typography variant='h3'>
            {isExisting ? 'Edit task' : 'Add new task'}
         </Typography>

         <EditorFormik>
            {(props) => (
               <Form>
                  <EditorTitleField
                     value={props.values.title}
                     onChange={props.handleChange}
                     error={props.touched.title && Boolean(props.errors.title)}
                     helperText={props.touched.title && props.errors.title}
                  />

                  <DescriptionField
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

                  <SubtasksFieldArr
                     subtasks={props.values.subtasks}
                     value={props.values.subtasks}
                     onChange={props.handleChange}
                     tochedSubtasks={props.touched.subtasks}
                     errorsSubtasks={props.errors.subtasks}
                  />

                  <SelectField
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
            )}
         </EditorFormik>
      </>
      // </Paper>
      // </Overlay>
   );
};
