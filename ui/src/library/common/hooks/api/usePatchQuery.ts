import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const patchData = async <T, R>(
   endpoint: string,
   bodyReq: T,
): Promise<R | undefined> => {
   try {
      const { data } = await axios.patch<R>(endpoint, bodyReq);
      return data;
   } catch (err) {
      throw new Error('Internal Server Error');
   }
};

export enum patchQueryNames {
   renameCategory = 'renameCategory',
}

export function usePatchQuery<T, R>(
   dataType: keyof typeof postDataTypes,
   id: string,
) {
   const RenameCategory = new QueryData(
      'renameCategory',
      `/boards/${id}/category`,
      ['boards'],
   );

   const postDataTypes = {
      renameCategory: RenameCategory,
   };

   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => patchData<T, R>(endpoint, bodyReq));
}
