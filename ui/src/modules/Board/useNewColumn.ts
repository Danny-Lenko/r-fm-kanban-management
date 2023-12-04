import { useAppSelector } from '../../library/common/hooks';
import { selectActiveBoardId } from '../../main/store';
import { columnColors } from '../../library/common/constants';

import { useQueryClient } from '@tanstack/react-query';
import { usePostQuery, postQueryNames } from '../../library/common/hooks';
import { IColumn } from '../../library/interfaces';

interface NewColumn extends Omit<IColumn, 'id' | 'tasks'> {
   board: {
      id: string;
   };
}

export const useNewColumn = (columnsNumber?: number) => {
   const boardId = useAppSelector(selectActiveBoardId);

   const newColumnValues = {
      name:
         'New-column ' + crypto.randomUUID().split('-').splice(0, 2).join('-'),
      color: (columnsNumber && columnColors[columnsNumber]) || '#E4EBFA',
      board: {
         id: boardId,
      },
   };

   const queryClient = useQueryClient();
   const dataType = postQueryNames.newColumn;
   const query = usePostQuery<NewColumn, void>(dataType);
   const createColumn = () => {
      query.mutate(newColumnValues, {
         onSuccess: (data) => {
            queryClient.invalidateQueries(['boards', boardId, 'with-details'], {
               exact: true,
            });
         },
      });
   };

   return { createColumn };
};
