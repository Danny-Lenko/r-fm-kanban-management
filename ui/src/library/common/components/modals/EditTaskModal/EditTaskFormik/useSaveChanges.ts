import { useQueryClient } from '@tanstack/react-query';

import { putQueryNames, usePutQuery } from '../../../../hooks';
import { IEditTask } from '../../../../../interfaces';
import { Values } from './utils';

export const useSaveChanges = (id: string) => {
   const queryClient = useQueryClient();
   const dataType = putQueryNames.editTaskById;
   const query = usePutQuery<IEditTask, void>(dataType, id);
   const saveChanges = async (values: Values, boardId: string) => {
      await query.mutateAsync(
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
   };
};
