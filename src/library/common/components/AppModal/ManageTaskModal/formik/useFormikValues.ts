import { useFormik, FormikValues } from 'formik';

import {
   manageActiveTask,
   manageColumnsChange,
   assignActiveBoard,
} from '../../../../../../main/slices';
import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';

export const useFormikValues = () => {
   const { managedTask, activeColId, activeBoardId, activeBoard } =
      useAppSelector((state) => state.data);

   const columns = activeBoard.columns;
   const activeCol = columns.find((col) => col.id === activeColId);

   const dispatch = useAppDispatch();

   const formik = useFormik<FormikValues>({
      // initial form values
      initialValues: {
         checked: managedTask.subtasks
            .filter((sub) => sub.isCompleted)
            .map((sub) => sub.title),
         status: managedTask.status,
      },

      // validation
      validationSchema: null,

      // form submission
      onSubmit: (values: FormikValues) => {
         // subtasks checkbox
         const managedSubtasks = handleCheckbox(managedTask, values);
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
               activeColId,
            );
            dispatch(manageColumnsChange(editedColumns));
         }

         // changes the state responsible for render
         dispatch(assignActiveBoard(activeBoardId));
      },
   });

   return { formik, columns, managedTask };
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
   id: number;
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
   activeColId: number,
) =>
   columns.map((col) =>
      col.id === activeColId
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
