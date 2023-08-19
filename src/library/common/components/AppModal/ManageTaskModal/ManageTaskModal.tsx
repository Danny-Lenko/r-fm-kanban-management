import { useEffect, useRef } from 'react';
import { FormikProps, FormikValues, Formik, Form } from 'formik';
import { useTheme, Typography } from '@mui/material';

import { DotsMenu } from '../..';
import { useManagerFormik, ManagerCheckbox, ManagerSelect } from '.';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
   setSubmissionTrigger,
   setTaskManaging,
} from '../../../../../main/slices';

import { CssHeading } from './CssComponents';

export const ManageTaskModal = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const { submissionTrigger } = useAppSelector((state) => state.modals);
   const { formik, cols, task } = useManagerFormik();

   const selectOptions = cols.map((col) => col.name);

   // const formRef = useRef<FormikProps<FormikValues>>(null);

   useEffect(() => {
      if (submissionTrigger) {
         // formRef.current?.handleSubmit();
         formik.handleSubmit();

         dispatch(setSubmissionTrigger(false));
         dispatch(setTaskManaging(false));
      }
   }, [submissionTrigger]);

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{task.title}</Typography>
            <DotsMenu isTaskMenu={true} />
         </CssHeading>
         <Typography variant='body1'>{task.description}</Typography>

         <Formik
            initialValues={formik.values}
            onSubmit={() => formik.handleSubmit()}
            // innerRef={formRef}
         >
            {
               <Form>
                  <ManagerCheckbox formik={formik} task={task} theme={theme} />
                  <ManagerSelect formik={formik} options={selectOptions} />
               </Form>
            }
         </Formik>
      </>
   );
};
