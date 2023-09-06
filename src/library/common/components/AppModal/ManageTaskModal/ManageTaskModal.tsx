import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Typography } from '@mui/material';

import { DotsMenu } from '../..';
import { useFormikValues, ManagerCheckbox, ManagerSelect } from '.';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
   setSubmissionTrigger,
   setTaskManaging,
} from '../../../../../main/store';

import { CssHeading } from './CssComponents';

export const ManageTaskModal = () => {
   const { submissionTrigger } = useAppSelector((state) => state.modals);
   const dispatch = useAppDispatch();

   const formikValues = useFormikValues();
   const { formik, activeTask } = formikValues;
   const { values, handleSubmit } = formik;
   const { title, description } = activeTask!;

   useEffect(() => {
      if (submissionTrigger) {
         formik.handleSubmit();

         dispatch(setSubmissionTrigger(false));
         dispatch(setTaskManaging(false));
      }
   }, [submissionTrigger]);

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{title}</Typography>
            <DotsMenu isTaskMenu={true} />
         </CssHeading>
         <Typography variant='body1'>{description}</Typography>

         <Formik initialValues={values} onSubmit={() => handleSubmit()}>
            {
               <Form>
                  <ManagerCheckbox formikValues={formikValues} />
                  <ManagerSelect formikValues={formikValues} />
               </Form>
            }
         </Formik>
      </>
   );
};
