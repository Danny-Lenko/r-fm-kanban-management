import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Typography } from '@mui/material';

import { DotsMenu } from '../..';
import { useFormikValues, ManagerCheckbox, ManagerSelect } from '.';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
   selectSubmissionTrigger,
   setSubmissionTrigger,
   setTaskManaging,
} from '../../../../../main/store';

import { CssHeading } from './CssComponents';

import { dataTypeNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   if (isLoading) return <h1>...Loading</h1>;

   if (error) return <h1>Error</h1>;

   const { title, description } = data!;

   console.log(data);

   // const submissionTrigger = useAppSelector(selectSubmissionTrigger);
   // const dispatch = useAppDispatch();

   // const formikValues = useFormikValues();
   // const { formik, activeTask } = formikValues;
   // const { values, handleSubmit } = formik;
   // const { title, description } = activeTask!;

   // useEffect(() => {
   //    if (submissionTrigger) {
   //       formik.handleSubmit();

   //       dispatch(setSubmissionTrigger(false));
   //       dispatch(setTaskManaging(false));
   //    }
   // }, [submissionTrigger]);

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{title}</Typography>
            <DotsMenu isTaskMenu={true} />
         </CssHeading>
         <Typography variant='body1'>{description}</Typography>

         {/* <Formik initialValues={values} onSubmit={() => handleSubmit()}>
            {
               <Form>
                  <ManagerCheckbox formikValues={formikValues} />
                  <ManagerSelect formikValues={formikValues} />
               </Form>
            }
         </Formik> */}
      </>
   );
};
