import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

class QueryData {
   name: string;
   endpoint: string;
   key: string[];

   constructor(name: string, endpoint: string, key: string[]) {
      this.name = name;
      this.endpoint = endpoint;
      this.key = key;
   }
}

const getData = async <T,>(endpoint: string): Promise<T> => {
   const { data } = await axios.get<T>(endpoint);
   return data;
};

export enum dataTypeNames {
   boards = 'boards',
   categories = 'categories',
   boardDetails = 'boardDetails',
   taskById = 'taskById',
}

export function useGetQuery<T>(
   dataType: string,
   id?: string,
   useQueryConfig?: Record<string, string | number>,
) {
   const Boards = new QueryData('boards', '/boards', ['boards']);
   const Categories = new QueryData('categories', '/boards/by-categories', [
      'boards',
      'by-categories',
   ]);
   const DetailedBoard = new QueryData(
      'boardDetails',
      `/boards/${id!}/with-details`,
      ['boards', id!, 'with-details'],
   );
   const TaskById = new QueryData('taskById', `tasks/${id}`, ['tasks', id!]);

   const getDataTypes = {
      boards: Boards,
      categories: Categories,
      boardDetails: DetailedBoard,
      taskById: TaskById,
   };

   const { key, endpoint } =
      getDataTypes[dataType as keyof typeof getDataTypes];

   if (!endpoint) {
      throw new Error(`Invalid dataType: ${dataType}`);
   }

   return useQuery(key, () => getData<T>(endpoint), useQueryConfig);
}

// ============================ POST

const postData = async <T, R>(endpoint: string, bodyReq: T): Promise<R> => {
   const { data } = await axios.post<R>(endpoint, bodyReq);
   console.log(bodyReq);
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
