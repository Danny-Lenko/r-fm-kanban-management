import { Typography } from '@mui/material';

import { dataTypeNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

import { EditTaskFormik, LoadingFormik } from '.';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   return (
      <>
         <Typography variant='h3'>{'Edit task'}</Typography>

         {isLoading && <LoadingFormik />}
         {data && <EditTaskFormik {...data} />}
      </>
   );
};
