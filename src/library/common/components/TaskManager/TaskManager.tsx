import Button from '@mui/material/Button';
import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/hooks';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';
import { assembleTaskManagerStyles, assembleCheckboxStyles } from './taskManagerStyles';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// const validationSchema = yup.object({
//    email: yup
//       .string()
//       .email('Enter a valid email')
//       .required('Email is required'),
//    password: yup
//       .string()
//       .min(8, 'Password should be of minimum 8 characters length')
//       .required('Password is required'),
// });

const TaskManager = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const colId = useAppSelector(state => state.data.activeColId)
   const taskId = useAppSelector(state => state.data.activeTaskId)
   const theme = useTheme()
   console.log(colId)

   const formik = useFormik({
      initialValues: {
         checked: task.subtasks.filter(sub => sub.isCompleted).map(sub => sub.title),
      },
      validationSchema: null,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2));
      },
   });



   return (
      <Overlay>
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

                     <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                     </Button>
                  </FormGroup>


                  {/* <TextField
                     fullWidth
                     id="email"
                     name="email"
                     label="Email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     error={formik.touched.email && Boolean(formik.errors.email)}
                     helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                     fullWidth
                     id="password"
                     name="password"
                     label="Password"
                     type="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={formik.touched.password && Boolean(formik.errors.password)}
                     helperText={formik.touched.password && formik.errors.password}
                  /> */}
                  {/* <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                     </Button> */}
               </form>
            </div>

         </Paper>
      </Overlay>
   );
}

export default TaskManager;