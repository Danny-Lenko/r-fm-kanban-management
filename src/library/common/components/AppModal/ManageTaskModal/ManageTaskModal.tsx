import { useEffect, useRef } from 'react';
import { FormikProps, FormikValues, Formik } from 'formik';
import { useTheme, Typography } from '@mui/material';

import { DotsMenu } from '../..';
import { useManagerFormik, ManagerCheckbox, ManagerSelect } from '.';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
   setSubmissionTrigger,
   setTaskManaging,
} from '../../../../../main/slices';

import { Heading } from './manageTaskModalStyles';

export const ManageTaskModal = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const { submissionTrigger } = useAppSelector((state) => state.modals);
   const { formik, cols, task } = useManagerFormik();

   const formRef = useRef<FormikProps<FormikValues>>(null);

   useEffect(() => {
      if (submissionTrigger) {
         formRef.current?.handleSubmit();
         dispatch(setSubmissionTrigger(false));
         dispatch(setTaskManaging(false));
      }
   }, [submissionTrigger]);

   return (
      <>
         <Heading>
            <Typography variant='h3'>{task.title}</Typography>
            <DotsMenu isTaskMenu={true} />
         </Heading>
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
   );
};
