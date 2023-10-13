import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../../hooks';

import { dataTypeNames, useGetQuery } from '../../../../hooks';

import { ITask } from '../../../../../interfaces';

import { Values, createTask, saveChanges } from '.';
import {
   selectActiveBoardInfo,
   selectActiveColumnId,
   selectActiveTask,
   selectActiveTaskId,
   selectBoards,
   selectTaskIsExisting,
} from '../../../../../../main/store';

export const useFormikValues = () => {
   // const boards = useAppSelector(selectBoards);
   // const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   // const { columns } = activeBoard;

   const id = useAppSelector(selectActiveTaskId);

   const taskById = dataTypeNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
      staleTime: 60000,
   });

   // if (isLoading) return;

   // const [initialValues, setInitialValues] = useState({
   //    title: '...Loading',
   //    description: '...Loading',
   //    subtasks: ['', ''],
   //    status: '...Loading',
   // });

   // useEffect(() => {
   //    console.log(data)
   //    if (data?.title) {
   //       setInitialValues({
   //          title: data.title,
   //          description: data.description,
   //          subtasks: data.subtasks.map((sub) => sub.title),
   //          status: data.status,
   //       });
   //    }
   // }, [isLoading]);

   // console.log(data);

   // const activeColumnId = useAppSelector(selectActiveColumnId);
   // const activeTask = useAppSelector(selectActiveTask);

   // const taskIsExisting = useAppSelector(selectTaskIsExisting) && activeTask;

   // const dispatch = useAppDispatch();

   // const submissionParams = {
   //    columns,
   //    boards,
   //    activeBoard,
   //    activeBoardId,
   //    dispatch,
   //    activeTask,
   //    activeColumnId,
   // };

   // const initialValues = taskIsExisting
   //    ? {
   //         title: activeTask.title,
   //         description: activeTask.description,
   //         subtasks: activeTask.subtasks.map((sub) => sub.title),
   //         status: activeTask.status,
   //      }
   //    : {
   //         title: '',
   //         description: '',
   //         subtasks: ['', ''],
   //         status: columns[0].name,
   //      };

   const initialValues = isLoading
      ? {
           title: '...Loading',
           description: '...Loading',
           subtasks: ['', ''],
           status: '...Loading',
        }
      : {
           title: data!.title,
           description: data!.description,
           subtasks: data!.subtasks.map((sub) => sub.title),
           status: data!.status,
        };

   const submit = (values: Values) => {};
   // taskIsExisting
   //    ? saveChanges({ values, ...submissionParams })
   //    : createTask({ values, ...submissionParams });

   // console.log(initialValues);

   return {
      initialValues,
      submit,
   };
};
