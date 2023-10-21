import { useAppSelector, useAppDispatch } from '../../../../../hooks';

import { Values, createTask, saveChanges } from '.';
import {
   selectActiveBoardInfo,
   selectActiveColumnId,
   selectActiveTask,
   selectBoards,
   selectTaskIsExisting,
} from '../../../../../../../main/store';

export const useFormikValues = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard;

   const activeColumnId = useAppSelector(selectActiveColumnId);
   const activeTask = useAppSelector(selectActiveTask);

   const taskIsExisting = useAppSelector(selectTaskIsExisting) && activeTask;

   const dispatch = useAppDispatch();

   const submissionParams = {
      columns,
      boards,
      activeBoard,
      activeBoardId,
      dispatch,
      activeTask,
      activeColumnId,
   };

   const initialValues = taskIsExisting
      ? {
           title: activeTask.title,
           description: activeTask.description,
           subtasks: activeTask.subtasks.map((sub) => sub.title),
           status: activeTask.status,
        }
      : {
           title: '',
           description: '',
           subtasks: ['', ''],
           status: columns[0].name,
        };

   const submit = (values: Values) => {}
      // taskIsExisting
      //    ? saveChanges({ values, ...submissionParams })
      //    : createTask({ values, ...submissionParams });

   return {
      initialValues,
      submit,
   };
};
