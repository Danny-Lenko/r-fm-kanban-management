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
         // return;
         throw new Error('Conflict');
         // throw err;
      }
      throw new Error('Internal Server Error');
   }
};

export enum postQueryNames {
   signin = 'signin',
   newTask = 'newTask',
   newColumn = 'newColumn',
   newCategory = 'newCategory',
}

export function usePostQuery<T, R>(
   dataType: keyof typeof postDataTypes,
   // id?: string,
) {
   const SignIn = new QueryData('signin', '/auth/signin', ['signin']);
   const NewTask = new QueryData('newTask', '/tasks', ['task']);
   const NewColumn = new QueryData('newColumn', '/columns', ['column']);
   const NewCategory = new QueryData('newCategory', 'boards/category', [
      'category',
   ]);

   const postDataTypes = {
      signin: SignIn,
      newTask: NewTask,
      newColumn: NewColumn,
      newCategory: NewCategory,
   };

   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
