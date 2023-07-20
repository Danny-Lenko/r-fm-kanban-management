// import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { assembleManageTaskModalStyles } from './manageTaskModalStyles';
import { FormikProps, FormikValues, Formik } from 'formik';
import { useRef } from 'react';
import ManagerCheckbox from './ManagerCheckbox/ManagerCheckbox';
import ManagerSelect from './ManagerSelect/ManagerSelect';

import { DotsMenu } from '../../DotsMenu';
// import { useManagerFormik } from '../../../hooks';

import { useManagerFormik } from '.';

export const ManageTaskModal = () => {
   const theme = useTheme();
   const { formik, cols, task } = useManagerFormik();

   const formRef = useRef<FormikProps<FormikValues>>(null);
   const handleSubmit = () => {
      if (formRef.current) {
         formRef.current.handleSubmit();
      }
   };

   return (
      // <Overlay submitHandler={handleSubmit}>
      // <Paper elevation={0} sx={assembleManageTaskModalStyles(theme)}>
      <>
         <Box className='heading'>
            <Typography variant='h3'>{task.title}</Typography>
            <DotsMenu isTaskMenu={true} />
         </Box>
         <Typography variant='body1'>{task.description}</Typography>

         <Formik
            initialValues={formik.values}
            onSubmit={formik.submitForm}
            innerRef={formRef}
         >
            <form onSubmit={formik.handleSubmit}>
               <ManagerCheckbox formik={formik} task={task} theme={theme} />
               <ManagerSelect formik={formik} cols={cols} />
            </form>
         </Formik>
      </>
      // </Paper>
      // </Overlay>
   );
};
