import { Typography } from '@mui/material';

import { dataTypeNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

import { EditTaskFormik, LoadingFormik, CssHeading } from '.';
import { DotsMenu } from '../../DotsMenu';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{'Edit task'}</Typography>
            <DotsMenu isTaskMenu={true} />
         </CssHeading>

         {isLoading && <LoadingFormik />}
         {data && <EditTaskFormik {...data} />}
      </>
   );
};
