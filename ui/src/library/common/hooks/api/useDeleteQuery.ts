import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const deleteData = async (endpoint: string) => {
   const { data } = await axios.delete(endpoint);
   return data;
};

export enum deleteQueryNames {
   // boards = 'boards',
   // boardDetails = 'boardDetails',
   category = 'boardsByCategory',
   taskById = 'taskById',
}

export function useDeleteQuery(
   dataType: string,
   id?: string,
   useQueryConfig?: Record<string, string | number>,
) {
   // const Boards = new QueryData('boards', '/boards', ['boards']);
   const Category = new QueryData(
      'boardsByCategory',
      `/boards/by-category/${id}`,
      ['boards', 'by-category'],
   );
   // const DetailedBoard = new QueryData(
   //    'boardDetails',
   //    `/boards/${id!}/with-details`,
   //    ['boards', id!, 'with-details'],
   // );
   const TaskById = new QueryData('taskById', `tasks/${id}`, ['tasks', id!]);

   const getDataTypes = {
      // boards: Boards,
      // categories: Categories,
      // boardDetails: DetailedBoard,
      boardsByCategory: Category,
      taskById: TaskById,
   };

   const { key, endpoint } =
      getDataTypes[dataType as keyof typeof getDataTypes];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   // return useQuery(key, () => deleteData<T>(endpoint), useQueryConfig);
   return useMutation(() => deleteData(endpoint));
}
