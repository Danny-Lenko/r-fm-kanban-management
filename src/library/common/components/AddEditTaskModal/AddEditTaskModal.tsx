import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useTheme } from '@mui/material/styles';
import { assembleManageTaskModalStyles } from './addEditTaskModalStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProps, FormikValues, useFormik, Formik, FieldArray, Form, Field } from 'formik';
import { useRef } from 'react';
import { manageActiveTask, assignActiveBoard, manageColumnsChange } from '../../../../main/slices/dataSlice';
import { countComletedSubtasks } from '../../../utilities/utils';
import SelectEl from '../SelectEl/SelectEl';
import CustomBtn from '../CustomBtn/CustomBtn';
import { closeTaskEditor } from '../../../../main/slices/modalElsSlice';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

const AddEditTaskModal = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const activeColId = useAppSelector(state => state.data.activeColId)
   const theme = useTheme()
   const dispatch = useAppDispatch()

   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const activeCol = cols.find(col => col.id === activeColId)

   const schema = Yup.object().shape({
      title: Yup
         .string()
         .required("Can't be empty"),
      description: Yup
         .string(),
      subtasks: Yup.array().of( Yup.string().trim().required("Can't be empty") )
   });

   return (
      <Overlay>
         <Paper elevation={0} sx={assembleManageTaskModalStyles(theme)}>
            <Box className='heading'>
               <Typography variant='h3'>Add new task</Typography>
            </Box>
            <Typography variant='body1'>{task.description}</Typography>

            <div>
               <Formik
                  initialValues={{
                     title: '',
                     description: '',
                     subtasks: ['', ''],
                     status: task.status
                  }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                     console.log(values)
                     dispatch(closeTaskEditor('close'))
                  }}
               >
                  {props => (
                     <Form>

                        <Typography
                           style={{ margin: '24px 0 8px' }}
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Title
                        </Typography>

                        <TextField
                           fullWidth
                           id="title"
                           name="title"
                           value={props.values.title}
                           onChange={props.handleChange}
                           error={props.touched.title && Boolean(props.errors.title)}
                           helperText={props.touched.title && props.errors.title}
                        />

                        <Typography
                           style={{ margin: '24px 0 8px' }}
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Description
                        </Typography>

                        <TextField
                           multiline
                           rows={4}
                           fullWidth
                           id="description"
                           name="description"
                           value={props.values.description}
                           onChange={props.handleChange}
                           error={props.touched.description && Boolean(props.errors.description)}
                           helperText={props.touched.description && props.errors.description}
                        />

                        <Typography
                           style={{ margin: '24px 0 8px' }}
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Subtasks
                        </Typography>

                        <FieldArray
                           name="subtasks"
                           render={arrayHelpers => (
                              <div>
                                 {props.values.subtasks && props.values.subtasks.length > 0 ? (
                                    props.values.subtasks.map((sub, index) => (
                                       <div key={index}>
                                          <TextField
                                             name={`subtasks.${index}`}
                                             fullWidth
                                             id={`subtasks.${index}`}
                                             value={props.values.subtasks[index]}
                                             onChange={props.handleChange}
                                             error={props.touched.subtasks && Boolean(props.errors.subtasks ? props.errors.subtasks[index] : '')}
                                             helperText={props.touched.subtasks && props.errors.subtasks ? props.errors.subtasks[index] : ''}
                                          />
                                          <button
                                             type="button"
                                             onClick={() => arrayHelpers.remove(index)} // remove a sub from the list
                                          >
                                             -
                                          </button>
                                       </div>
                                    ))
                                 ) : (
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                       Add a friend
                                    </button>
                                 )}
                              </div>
                           )}
                        />

                        <CustomBtn
                           sizeSm={true}
                           color='secondary'
                           text='+ Add New Subtask'
                           styles={{ width: '100%', mt: 4 }}
                        />

                        <Typography
                           style={{ margin: '24px 0 8px' }}
                           className='subtasks-heading'
                           variant='body2'
                        >
                           Current Status
                        </Typography>

                        <SelectEl
                           value={props.values.status}
                           onChange={props.handleChange}
                           cols={cols}
                        />

                        <CustomBtn
                           sizeSm={true}
                           color='primary'
                           text='Create Task'
                           styles={{ width: '100%', mt: 4 }}
                           type='submit'
                        />
                     </Form>
                  )}
               </Formik>
            </div>
         </Paper>
      </Overlay>
   );
}

export default AddEditTaskModal;
