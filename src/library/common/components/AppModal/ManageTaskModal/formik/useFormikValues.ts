import { useFormik, FormikValues } from 'formik';

import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import {
   manageActiveTask,
   manageColumnsChange,
   assignActiveBoard,
   selectActiveBoardInfo,
   selectActiveColumnId,
   selectActiveTask,
} from '../../../../../../main/store';
export const useFormikValues = () => {
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard;

   const activeColumnId = useAppSelector(selectActiveColumnId);
   const activeTask = useAppSelector(selectActiveTask);

   const activeCol = columns.find((col) => col.id === activeColumnId);

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
         dispatch(manageActiveTask(editedTask));

         // task status select
         const taskIsAlien = editedTask.status !== activeCol?.name;
         if (taskIsAlien) {
            const editedColumns = handleSelect(
               columns,
               editedTask,
               activeColumnId,
            );
            dispatch(manageColumnsChange(editedColumns));
         }

         // changes the state responsible for render
         dispatch(assignActiveBoard(activeBoardId));
      },
   });

   return { formik, columns, activeTask };
};

// Utitility functions
interface Task {
   id: number;
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
                 .map((task, i) => ({ ...task, id: i })),
           }
         : col.name === editedTask.status
         ? {
              ...col,
              tasks: [editedTask, ...col.tasks].map((task, i) => ({
                 ...task,
                 id: i,
              })),
           }
         : col,
   );
