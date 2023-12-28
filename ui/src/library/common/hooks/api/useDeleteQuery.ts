import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const deleteData = async (endpoint: string) => {
   const { data } = await axios.delete(endpoint);
   return data;
};

export enum deleteQueryNames {
   category = 'boardsByCategory',
   boardById = 'boardById',
   taskById = 'taskById',
}

export function useDeleteQuery(
   dataType: string,
   id?: string,
   // useQueryConfig?: Record<string, string | number>,
) {
   const Category = new QueryData(
      'boardsByCategory',
      `/boards/by-category/${id}`,
      ['boards', 'by-category'],
   );
   const BoardById = new QueryData('boardById', `boards/${id}`, [
      'boards',
      id!,
   ]);
   const TaskById = new QueryData('taskById', `tasks/${id}`, ['tasks', id!]);

   const getDataTypes = {
      boardsByCategory: Category,
      boardById: BoardById,
      taskById: TaskById,
   };

   const { key, endpoint } =
      getDataTypes[dataType as keyof typeof getDataTypes];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation(() => deleteData(endpoint));
}
