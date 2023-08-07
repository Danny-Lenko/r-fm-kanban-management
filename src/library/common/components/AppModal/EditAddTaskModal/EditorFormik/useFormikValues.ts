import { useAppSelector, useAppDispatch } from '../../../../hooks';

import { Values, createTask, saveChanges } from '.';

export const useFormikValues = () => {
   const {
      boards,
      activeBoard,
      activeBoardId,
      activeColId,
      managedTask: activeTask,
   } = useAppSelector((state) => state.data);
   const { columns } = activeBoard;

   const isExisting = useAppSelector((state) => state.modals.isExistingTask);
   const dispatch = useAppDispatch();

   const submissionParams = {
      columns,
      boards,
      activeBoard,
      activeBoardId,
      dispatch,
      activeTask,
      activeColId,
   };

   const initialValues = isExisting
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

   const submit = (values: Values) =>
      isExisting
         ? saveChanges({ values, ...submissionParams })
         : createTask({ values, ...submissionParams });

   return {
      initialValues,
      submit,
   };
};
