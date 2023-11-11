import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const postData = async <T, R>(endpoint: string, bodyReq: T): Promise<R> => {
   const { data } = await axios.post<R>(endpoint, bodyReq);
   return data;
};

export enum postQueryNames {
   signin = 'signin',
   newTask = 'newTask',
   // editTaskById = 'editTaskById',
}

export function usePostQuery<T, R>(
   dataType: keyof typeof postDataTypes,
   id?: string,
) {
   const SignIn = new QueryData('signin', '/auth/signin', ['signin']);
   const NewTask = new QueryData('newTask', '/tasks', ['task']);
   // const EditTaskById = new QueryData('editTaskById', `/tasks/edit/${id}`, [
   //    'tasks',
   //    'edit',
   //    id!,
   // ]);

   const postDataTypes = {
      signin: SignIn,
      newTask: NewTask,
      // editTaskById: EditTaskById,
   };

   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
