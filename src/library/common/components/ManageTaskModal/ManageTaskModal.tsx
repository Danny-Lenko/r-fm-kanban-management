import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';
import { assembleManageTaskModalStyles, assembleCheckboxStyles } from './manageTaskModalStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProps, FormikValues, Formik } from 'formik';
import { useRef } from 'react';
import SelectEl from '../SelectEl/SelectEl';
import useManageTaskModalFormik from '../../hooks/useManageTaskModalFomik';

const ManageTaskModal = () => {
   const theme = useTheme()
   const { formik, cols, task } = useManageTaskModalFormik()

   const formRef = useRef<FormikProps<FormikValues>>(null)
   const handleSubmit = () => {
      if (formRef.current) {
         formRef.current.handleSubmit()
      }
   }

   return (
      <Overlay submitHandler={handleSubmit}>
         <Paper elevation={0} sx={assembleManageTaskModalStyles(theme)}>
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

                        <SelectEl
                           value={formik.values.status}
                           onChange={formik.handleChange}
                           cols={cols}
                        />
                     </form>
                  )}
               </Formik>
            </div>
         </Paper>
      </Overlay>
   );
}

export default ManageTaskModal;
