import { Typography } from '@mui/material';

import { EditTaskFormik, LoadingContent, CssHeading } from '.';
import { DotsMenu, Error } from '../..';
import { getQueryNames, useGetQuery } from '../../../hooks';
import { ITask } from '../../../../interfaces';

export const ModalContent = ({ id }: { id: string }) => {
   const taskById = getQueryNames.taskById;
   const { isLoading, isError, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   if (isError)
      return <Error>{'Failed to load data. Check your connection'}</Error>;

   return (
      <>
         <CssHeading>
            <Typography variant='h3'>{'Edit task'}</Typography>
            <DotsMenu mode={'taskMenu'} />
         </CssHeading>

         {isLoading && <LoadingContent />}
         {data && <EditTaskFormik {...data} />}
      </>
   );
};
