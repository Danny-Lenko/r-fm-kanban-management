import { useTheme, Typography, Box } from '@mui/material';
import { assembleManageTaskModalStyles } from './manageTaskModalStyles';
import { FormikProps, FormikValues, Formik } from 'formik';
import { useEffect, useRef } from 'react';

import { DotsMenu } from '../..';
import { useManagerFormik, ManagerCheckbox, ManagerSelect } from '.';

import { setBoardManagerRef } from '../../../../../main/slices';
import { useAppDispatch } from '../../../hooks';

export const ManageTaskModal = () => {
   const theme = useTheme();
   const { formik, cols, task } = useManagerFormik();
   const dispatch = useAppDispatch();

   const formRef = useRef<FormikProps<FormikValues>>(null);

   useEffect(() => {
      console.log(formRef);
      dispatch(setBoardManagerRef(JSON.stringify(formRef)));
   }, []);

   // const handleSubmit = () => {
   //    if (formRef.current) {
   //       formRef.current.handleSubmit();
   //    }
   // };

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
