import { useQueryClient } from '@tanstack/react-query';

import { putQueryNames, usePutQuery } from '../../../../hooks';
import { IEditTask } from '../../../../../interfaces';
import { Values } from './utils';

export const useSaveChanges = (id: string) => {
   const queryClient = useQueryClient();
   const dataType = putQueryNames.editTaskById;
   const { mutateAsync, isLoading, isError } = usePutQuery<IEditTask, void>(
      dataType,
      id,
   );
   const saveChanges = async (values: Values, boardId: string) => {
      await mutateAsync(
         { ...values, boardId },
         {
            onSuccess: (data) => {
               queryClient.invalidateQueries(['tasks', id], { exact: true });
            },
         },
      );
   };

   return {
      saveChanges,
      isLoading,
      isError,
   };
};
