import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/hooks';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';

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
   const theme = useTheme()
   console.log(task)

   const formik = useFormik({
      initialValues: {
         email: 'foobar@example.com',
         password: 'foobar',
      },
      validationSchema: null,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2));
      },
   });

   const taskManageStyles = {
      zIndex: 11000,
      p: { xs: 3, sm: 4 },
      borderRadius: '8px',
      width: { sm: '480px' },
      '& .heading': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         gap: '1rem',
         mb: 3,
         '& .MuiTypography-h3': {
            color: theme.palette.text.primary
         },
      },
      '& .MuiTypography-body1': {
         color: 'greyCustom.200',
         mb: 3
      },
      '& .subtasks-heading': {
         color: theme.palette.mode === 'light' ? 'greyCustom.200' : 'common.white',
         mb: 2
      }
   }

   const assembleCheckboxStyles = (subtask:any) => ({
      backgroundColor: theme.palette.background.default,
      mt: 1,
      borderRadius: 1,
      '& .MuiCheckbox-root': {
         '& .MuiSvgIcon-root': {
            color: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
         },
         '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
               color: 'primary.main'
            }
         }
      },
      '& .MuiTypography-root': {
         mb: 0,
         fontSize: 12/16 + 'rem',
         fontWeight: 700,
         color: !subtask.isCompleted ? theme.palette.text.primary : 'greyCustom.200',
         textDecoration: subtask.isCompleted && 'line-through'
      }
   })

   return (
      <Overlay>
         <Paper elevation={0} sx={taskManageStyles}>
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
               <form onSubmit={formik.handleSubmit}>

                  <FormGroup>
                     {
                        task.subtasks.map(sub => 
                           <FormControlLabel 
                              sx={ assembleCheckboxStyles(sub) }
                              control={<Checkbox defaultChecked={sub.isCompleted} />} 
                              label={sub.title} 
                           />
                        )
                     }
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