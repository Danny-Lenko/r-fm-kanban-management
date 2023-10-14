import { useFormik, FormikValues } from 'formik';

import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
   setActiveBoardId,
   selectActiveBoardInfo,
   selectActiveColumnInfo,
   updateColumns,
   updateActiveTask,
   selectActiveTask,
} from '../../../../../../main/store';
export const useFormikValues = () => {
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard;

   const { activeColumn, activeColumnId } = useAppSelector(
      selectActiveColumnInfo,
   );

   const activeTask = useAppSelector(selectActiveTask)!;

   const dispatch = useAppDispatch();

   const formik = useFormik<FormikValues>({
      initialValues: {
         checked: activeTask.subtasks
            .filter((sub) => sub.isCompleted)
            .map((sub) => sub.title),
         status: activeTask.status,
      },

      validationSchema: null,

      onSubmit: (values: FormikValues) => {
         // subtasks checkbox
         const managedSubtasks = handleCheckbox(activeTask, values);
         const editedTask = {
            ...managedSubtasks,
            completedSubtasks: countCompletedSubtasks(managedSubtasks),
         };

         dispatch(updateActiveTask(editedTask));

         // task status select
         const taskIsAlien = editedTask.status !== activeColumn!.name;
         if (taskIsAlien) {
            const editedColumns = handleSelect(
               columns,
               editedTask,
               activeColumnId,
            );

            dispatch(updateColumns(editedColumns));
         }

         // changes the state responsible for render
         dispatch(setActiveBoardId(activeBoardId));
      },
   });

   return { formik, columns, activeTask };
};

// =========================================== Utitility functions
interface Task {
   id: string;
   status: string;
   subtasks: Subtask[];
}

interface Subtask {
   title: string;
}

interface Column {
   id: string;
   name: string;
   tasks: Task[];
}

const handleCheckbox = <T extends Task>(task: T, values: FormikValues): T => ({
   ...task,
   status: values.status,
   subtasks: task.subtasks.map((sub) =>
      values.checked.some((val: string) => val === sub.title)
         ? { ...sub, isCompleted: true }
         : { ...sub, isCompleted: false },
   ),
});

const handleSelect = <C extends Column, T extends Task>(
   columns: C[],
   editedTask: T,
   activeColumnId: string,
) =>
   columns.map((col) =>
      col.id === activeColumnId
         ? {
              ...col,
              tasks: col.tasks
                 .filter((task) => task.id !== editedTask.id)
                 .map((task) => ({ ...task })),
           }
         : col.name === editedTask.status
         ? {
              ...col,
              tasks: [editedTask, ...col.tasks].map((task) => ({
                 ...task,
              })),
           }
         : col,
   );