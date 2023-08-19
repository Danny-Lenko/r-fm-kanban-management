import { useFormik, FormikValues } from 'formik';

import {
   manageActiveTask,
   manageColumnsChange,
   assignActiveBoard,
} from '../../../../../../main/slices';
import { countCompletedSubtasks } from '../../../../../utilities/utils';
import { useAppSelector, useAppDispatch } from '../../../../hooks';

export const useManagerFormik = () => {
   const { managedTask, activeColId, activeBoardId, activeBoard } =
      useAppSelector((state) => state.data);

   const cols = activeBoard.columns;
   const activeCol = cols.find((col) => col.id === activeColId);

   const dispatch = useAppDispatch();

   const formik = useFormik<FormikValues>({
      initialValues: {
         checked: managedTask.subtasks
            .filter((sub) => sub.isCompleted)
            .map((sub) => sub.title),
         status: managedTask.status,
      },
      validationSchema: null,

      onSubmit: (values: FormikValues) => {
         const managedSubs = {
            ...managedTask,
            status: values.status,
            subtasks: managedTask.subtasks.map((sub) =>
               values.checked.some((val: string) => val === sub.title)
                  ? { ...sub, isCompleted: true }
                  : { ...sub, isCompleted: false },
            ),
         };
         const editedTask = {
            ...managedSubs,
            completedSubtasks: countCompletedSubtasks(managedSubs),
         };
         dispatch(manageActiveTask(editedTask));

         console.log(values);

         // task status changing logic
         const taskIsAlien = editedTask.status !== activeCol?.name;
         let editedCols = [...cols];
         if (taskIsAlien) {
            editedCols = cols.map((col) =>
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
            dispatch(manageColumnsChange(editedCols));
         }
         // changes the state responsible for render
         dispatch(assignActiveBoard(activeBoardId));
      },
   });

   return { formik, cols, task: managedTask };
};
