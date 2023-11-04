import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { QueryData } from '../../../utilities';

const postData = async <T, R>(endpoint: string, bodyReq: T): Promise<R> => {
   const { data } = await axios.post<R>(endpoint, bodyReq);
   return data;
};

const SignIn = new QueryData('signin', '/auth/signin', ['signin']);
const NewTask = new QueryData('newTask', '/tasks', ['task']);

export const postDataTypes = {
   signin: SignIn,
   newTask: NewTask,
};

export function usePostQuery<T, R>(dataType: keyof typeof postDataTypes) {
   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
