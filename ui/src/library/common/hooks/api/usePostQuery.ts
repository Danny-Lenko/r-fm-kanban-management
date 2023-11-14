import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const postData = async <T, R>(
   endpoint: string,
   bodyReq: T,
): Promise<R | undefined> => {
   console.log('frontend: ', bodyReq);

   try {
      const { data } = await axios.post<R>(endpoint, bodyReq);
      return data;
   } catch (err) {
      console.error('An error occurred');
      throw new Error('Internal Server Error');
   }
};

export enum postQueryNames {
   signin = 'signin',
   newTask = 'newTask',
   newColumn = 'newColumn',
}

export function usePostQuery<T, R>(
   dataType: keyof typeof postDataTypes,
   id?: string,
) {
   const SignIn = new QueryData('signin', '/auth/signin', ['signin']);
   const NewTask = new QueryData('newTask', '/tasks', ['task']);
   const NewColumn = new QueryData('newColumn', '/columns', ['column']);

   const postDataTypes = {
      signin: SignIn,
      newTask: NewTask,
      newColumn: NewColumn,
   };

   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
