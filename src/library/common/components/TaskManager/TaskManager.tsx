import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';
import { assembleTaskManagerStyles, assembleCheckboxStyles } from './taskManagerStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProps, FormikValues, useFormik, Formik } from 'formik';
import { useRef } from 'react';
import { manageActiveTask, assignActiveBoard } from '../../../../main/slices/dataSlice';
import { countComletedSubtasks } from '../../../utilities/utils';

const TaskManager = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const theme = useTheme()
   const dispatch = useAppDispatch()

   const formRef = useRef<FormikProps<FormikValues>>(null)
   const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
   }

   const formik = useFormik({
      initialValues: {
         checked: task.subtasks.filter(sub => sub.isCompleted).map(sub => sub.title),
      },
      validationSchema: null,
      onSubmit: (values) => {
         const managedSubs = {
            ...task,
            subtasks: task.subtasks.map(sub => values.checked.some(val => val === sub.title) ? { ...sub, isCompleted: true } : { ...sub, isCompleted: false })
         }
         const editedTask = {
            ...managedSubs,
            completedSubtasks: countComletedSubtasks(managedSubs)
         }
         dispatch(manageActiveTask(editedTask))
         dispatch(assignActiveBoard(activeBoardId))
      },
   });

   return (
      <Overlay submitHandler={handleSubmit}>
         <Paper elevation={0} sx={assembleTaskManagerStyles(theme)}>
            <Box className='heading'>
               <Typography variant='h3'>{task.title}</Typography>
               <DotsMenu />
            </Box>
            <Typography variant='body1'>{task.description}</Typography>
            <Typography
               className='subtasks-heading'
               variant='body2'
            >
               Subtasks ({task.completedSubtasks} of {task.subtasks.length})
            </Typography>

            <div>
               <Formik
                  initialValues={formik.values}
                  onSubmit={formik.submitForm}
                  innerRef={formRef}
               >
                  {props => (
                     <form onSubmit={formik.handleSubmit} >
                        <FormGroup>
                           {
                              task.subtasks.map(sub =>
                                 <FormControlLabel
                                    key={sub.title}
                                    sx={assembleCheckboxStyles(sub, theme)}
                                    control={<Checkbox value={sub.title} defaultChecked={sub.isCompleted} />}
                                    label={sub.title}
                                    name='checked'
                                    onChange={formik.handleChange}
                                 />
                              )
                           }
                        </FormGroup>
                     </form>
                  )}
               </Formik>
            </div>
         </Paper>
      </Overlay >
   );
}

export default TaskManager;
