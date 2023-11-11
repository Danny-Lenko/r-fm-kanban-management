import { Typography } from '@mui/material';

import { getQueryNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

import { EditTaskFormik, LoadingContent, CssHeading } from '.';
import { DotsMenu, Error } from '../..';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = getQueryNames.taskById;
   const { isLoading, isError, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   if (isError) return <Error>
      {'Error'}
   </Error>;

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{'Edit task'}</Typography>
            <DotsMenu isTaskMenu={true} />
         </CssHeading>

         {isLoading && <LoadingContent />}
         {data && <EditTaskFormik {...data} />}
      </>
   );
};
