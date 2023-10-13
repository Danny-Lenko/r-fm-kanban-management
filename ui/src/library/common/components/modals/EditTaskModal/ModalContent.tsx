import { useState, useEffect, useLayoutEffect } from 'react';

import { Form, Formik, FormikProps } from 'formik';
import { Typography } from '@mui/material';

import { dataTypeNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

import { AppBtn } from '../..';

import {
   EditorTitle,
   EditorDescription,
   EditorSelect,
   EditorSubtasks,
   EditorFormik,
   Values,
} from '.';

export const ModalContent = ({ id }: { id: string }) => {
   const btnProps = {
      type: 'submit' as 'submit',
      buttonSize: 'small' as 'small',
      color: 'primary' as 'primary',
      fullWidth: true,
      sx: { marginTop: 4 },
   };

   // console.log(initialValues);

   const submit = (values: Values) => {};

   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   const loadingValues = {
      title: '...Loading',
      description: '...Loading',
      subtasks: ['...Loading', '...Loading'],
      status: '...Loading',
   };

   // const initialValues = {
   //    title: data?.title,
   //    description: data!.description,
   //    subtasks: data!.subtasks.map((sub) => sub.title),
   //    status: data!.status,
   // };

   console.log(isLoading);
   console.log(data);

   return (
      <>
         {/* <Typography variant='h3'>
            {taskIsExisting ? 'Edit task' : 'Add new task'}
         </Typography> */}
         {/* <EditorFormik> */}

         {isLoading && (
            <Formik initialValues={loadingValues} onSubmit={submit}>
               {(props) => {
                  return (
                     <Form>
                        <EditorTitle {...props} />
                        <EditorDescription {...props} />
                        <EditorSubtasks {...props} />
                        {/* <EditorSelect options={selectOptions} {...props} /> */}
                        <AppBtn {...btnProps}>
                           {/* {taskIsExisting ? 'Save Changes' : 'Create Task'} */}
                           {'Save Changes'}
                        </AppBtn>
                     </Form>
                  );
               }}
            </Formik>
         )}

         {data && (
            <Formik
               initialValues={{
                  title: data?.title,
                  description: data!.description,
                  subtasks: data!.subtasks.map((sub) => sub.title),
                  status: data!.status,
               }}
               onSubmit={submit}
            >
               {(props) => {
                  return (
                     <Form>
                        <EditorTitle {...props} />
                        <EditorDescription {...props} />
                        <EditorSubtasks {...props} />
                        {/* <EditorSelect options={selectOptions} {...props} /> */}
                        <AppBtn {...btnProps}>
                           {/* {taskIsExisting ? 'Save Changes' : 'Create Task'} */}
                           {'Save Changes'}
                        </AppBtn>
                     </Form>
                  );
               }}
            </Formik>
         )}
      </>
   );
};
