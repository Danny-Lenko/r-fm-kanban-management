import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';
import { assembleTaskManagerStyles, assembleCheckboxStyles } from './taskManagerStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProps, FormikValues, useFormik, Formik } from 'formik';
import { useRef } from 'react';
import { manageActiveTask, assignActiveBoard, manageColumnsChange } from '../../../../main/slices/dataSlice';
import { countComletedSubtasks } from '../../../utilities/utils';

const TaskManager = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const activeColId = useAppSelector(state => state.data.activeColId)
   const theme = useTheme()
   const dispatch = useAppDispatch()

   const formRef = useRef<FormikProps<FormikValues>>(null)
   const handleSubmit = () => {
      if (formRef.current) {
         formRef.current.handleSubmit()
      }
   }

   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const activeCol = cols.find(col => col.id === activeColId)

   const formik = useFormik({
      initialValues: {
         checked: task.subtasks.filter(sub => sub.isCompleted).map(sub => sub.title),
         status: task.status
      },
      validationSchema: null,
      // submission on overlay clicks
      onSubmit: (values) => {
         const managedSubs = {
            ...task,
            status: values.status,
            subtasks: task.subtasks.map(sub => values.checked.some(val => val === sub.title) ? { ...sub, isCompleted: true } : { ...sub, isCompleted: false })
         }
         const editedTask = {
            ...managedSubs,
            completedSubtasks: countComletedSubtasks(managedSubs)
         }
         dispatch(manageActiveTask(editedTask))
         
         // task status changing logic
         const taskIsAlien = editedTask.status !== activeCol?.name
         let editedCols = [...cols]
         if (taskIsAlien) {
            editedCols = cols.map(col => 
               col.id === activeColId ? { 
                  ...col, 
                  tasks: col.tasks.filter(task => task.id !== editedTask.id)
                     .map((task, i) => ( {...task, id: i} )) 
               } 
               : col.name === editedTask.status ? { 
                  ...col, 
                  tasks: [editedTask, ...col.tasks].map((task, i) => ( {...task, id: i} ))
               }
               : col
            )
            dispatch(manageColumnsChange(editedCols))
         }
         // changes the state responsible for render
         dispatch(assignActiveBoard(activeBoardId))
      },
   });

   return (
      <Overlay submitHandler={handleSubmit}>
         <Paper elevation={0} sx={assembleTaskManagerStyles(theme)}>
            <Box className='heading'>
               <Typography variant='h3'>{task.title}</Typography>
               <DotsMenu isTaskMenu={true} />
            </Box>
            <Typography variant='body1'>{task.description}</Typography>

            <div>
               <Formik
                  initialValues={formik.values}
                  onSubmit={formik.submitForm}
                  innerRef={formRef}
               >
                  {props => (
                     <form onSubmit={formik.handleSubmit} >
                        <Typography
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Subtasks ({task.completedSubtasks} of {task.subtasks.length})
                        </Typography>
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
                        <Typography
                           style={{ margin: '24px 0 8px' }}
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Current Status
                        </Typography>

                        <Select
                           value={formik.values.status}
                           id="status"
                           name="status"
                           MenuProps={{ sx: { zIndex: 12000 } }}
                           sx={{width: '100%', fontWeight: 700, borderColor: 'primary.main', '.MuiOutlinedInput-notchedOutline': {borderColor: 'linesCustom.light'}}}
                           size='small'
                           onChange={formik.handleChange}
                        >
                           { 
                              cols.map( col => <MenuItem key={col.id} value={col.name}>{col.name}</MenuItem> ) 
                           }
                        </Select>

                     </form>
                  )}
               </Formik>
            </div>
         </Paper>
      </Overlay>
   );
}

export default TaskManager;
