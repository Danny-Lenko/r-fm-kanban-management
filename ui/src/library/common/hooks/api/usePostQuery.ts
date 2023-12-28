import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const postData = async <T, R>(
   endpoint: string,
   bodyReq: T,
): Promise<R | undefined> => {
   try {
      const { data } = await axios.post<R>(endpoint, bodyReq);

      return data;
   } catch (err) {
      const { response } = err as AxiosError;
      if (response?.status === 409) {
         throw new Error('Conflict');
      }
      throw new Error('Internal Server Error');
   }
};

export enum postQueryNames {
   signin = 'signin',
   newCategory = 'newCategory',
   newBoard = 'newBoard',
   newColumn = 'newColumn',
   newTask = 'newTask',
}

export function usePostQuery<T, R>(
   dataType: keyof typeof postDataTypes,
   // id?: string,
) {
   const SignIn = new QueryData('signin', '/auth/signin', ['signin']);
   const NewCategory = new QueryData('newCategory', 'boards/category', [
      'category',
   ]);
   const NewBoard = new QueryData('newBoard', 'boards', ['boards']);
   const NewColumn = new QueryData('newColumn', '/columns', ['column']);
   const NewTask = new QueryData('newTask', '/tasks', ['task']);

   const postDataTypes = {
      signin: SignIn,
      newCategory: NewCategory,
      newBoard: NewBoard,
      newColumn: NewColumn,
      newTask: NewTask,
   };

   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
