import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

class RequestData {
   name: string;
   endpoint: string;
   key: string[];

   constructor(name: string, endpoint: string, key: string[]) {
      this.name = name;
      this.endpoint = endpoint;
      this.key = key;
   }
}

export const Boards = new RequestData('boards', '/boards', ['boards']);
export const Categories = new RequestData(
   'categories',
   '/boards/by-categories',
   ['boards', 'by-categories'],
);

export const getDataTypes = {
   boards: Boards,
   categories: Categories,
};

export const SignIn = new RequestData('signin', '/auth/signin', ['signin']);

export const postDataTypes = {
   signin: SignIn,
};

const getData = async <T,>(endpoint: string): Promise<T> => {
   const { data } = await axios.get<T>(endpoint);
   return data;
};

export function useGetData<T>(dataType: keyof typeof getDataTypes) {
   const { key, endpoint } = getDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useQuery(key, () => getData<T>(endpoint));
}

const postData = async <T, R>(endpoint: string, bodyReq: T): Promise<R> => {
   const { data } = await axios.post<R>(endpoint, bodyReq);
   return data;
};

export function usePostData<T, R>(dataType: keyof typeof postDataTypes) {
   const { endpoint } = postDataTypes[dataType];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useMutation((bodyReq: T) => postData<T, R>(endpoint, bodyReq));
}
