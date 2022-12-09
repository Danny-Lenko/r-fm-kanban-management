import Overlay from '../Overlay/Overlay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/hooks';
import { useTheme } from '@mui/material/styles';
import { assembleManageTaskModalStyles } from './EditAddTaskModalStyles';
import { Form } from 'formik';
import CustomBtn from '../CustomBtn/CustomBtn';
import TitleField from './EditorTitleField/EditorTitleField';
import DescriptionField from './EditorDescriptionField/EditorDescriptionField';
import SubtasksFieldArr from './EditorSubtasksFieldArr/EditorSubtasksFieldArr';
import SelectField from './EditorSelectField/EditorSelectField';
import AddEditTaskFormik from './EditorFormik/EditorFormik';

const AddEditTaskModal = () => {
   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const theme = useTheme()

   return (
      <Overlay>
         <Paper elevation={0} sx={assembleManageTaskModalStyles(theme)}>
            <Typography variant='h3'>Add new task</Typography>

            <AddEditTaskFormik>
               {(props: any) => (
                  <Form>
                     <TitleField
                        value={props.values.title}
                        onChange={props.handleChange}
                        error={props.touched.title && Boolean(props.errors.title)}
                        helperText={props.touched.title && props.errors.title}
                     />

                     <DescriptionField
                        value={props.values.description}
                        onChange={props.handleChange}
                        error={props.touched.description && Boolean(props.errors.description)}
                        helperText={props.touched.description && props.errors.description}
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

                     <CustomBtn
                        type='submit'
                        sizeSm={true}
                        color='primary'
                        text='Create Task'
                        styles={{ width: '100%', mt: 4 }}
                     />
                  </Form>
               )}
            </AddEditTaskFormik>
         </Paper>
      </Overlay>
   );
}

export default AddEditTaskModal;
