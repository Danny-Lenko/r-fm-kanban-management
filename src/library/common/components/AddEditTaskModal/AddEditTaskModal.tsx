import Overlay from '../Overlay/Overlay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useTheme } from '@mui/material/styles';
import { assembleManageTaskModalStyles } from './addEditTaskModalStyles';
import { Formik, Form } from 'formik';
import CustomBtn from '../CustomBtn/CustomBtn';
import { closeTaskEditor } from '../../../../main/slices/modalElsSlice';
import TitleField from './TitleField';
import DescriptionField from './DescriptionField';
import SubtasksFieldArr from './SubtasksFieldArr';
import SelectField from './SelectField';
import { schema } from './validationYup';
import { setBoards, assignActiveBoard } from '../../../../main/slices/dataSlice';

const AddEditTaskModal = () => {
   const boards = useAppSelector(state => state.data.boards)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const dispatch = useAppDispatch()
   const theme = useTheme()

   return (
      <Overlay>
         <Paper elevation={0} sx={assembleManageTaskModalStyles(theme)}>
            <Typography variant='h3'>Add new task</Typography>

            <Formik
               initialValues={{
                  title: '',
                  description: '',
                  subtasks: ['', ''],
                  status: cols[0].name
               }}
               validationSchema={schema}

               onSubmit={(values) => {
                  const activeCol = cols.find(col => col.name === values.status)
                  const newTask = {
                     ...values,
                     subtasks: values.subtasks.map(sub => ({ title: sub, isCompleted: false }) ),
                     completedSubtasks: 0,
                     id: activeCol!.tasks.length
                  }

                  const boardsUpdated = boards.map(board => board.id !== activeBoard.id ? board : {
                     ...board,
                     columns: board.columns.map(col => col.id !== activeCol!.id ? col : {
                        ...col,
                        tasks: [...col.tasks, newTask]
                     })
                  })

                  dispatch(setBoards(boardsUpdated))
                  dispatch(assignActiveBoard(activeBoardId))
                  dispatch(closeTaskEditor('close'))
               }}

            >
               {props => (
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
            </Formik>
         </Paper>
      </Overlay>
   );
}

export default AddEditTaskModal;
