import { useQueryClient } from '@tanstack/react-query';

import { SubmitValues } from '.';
import {
   selectActiveBoardId,
   selectTaskAddingColumn,
   setTaskAdding,
} from '../../../../../../../main/store';
import {
   useAppSelector,
   useAppDispatch,
   postQueryNames,
   usePostQuery,
} from '../../../../../hooks';
import { INewTask } from '../../../../../../interfaces';

export const useFormikValues = () => {
   const dispatch = useAppDispatch();
   const taskAddingColumn = useAppSelector(selectTaskAddingColumn);
   const activeBoardId = useAppSelector(selectActiveBoardId);

   const queryClient = useQueryClient();
   const dataType = postQueryNames.newTask;
   const query = usePostQuery<INewTask, void>(dataType);
   const createTask = async (values: INewTask) => {
      await query.mutateAsync(values, {
         onSuccess: (data) => {
            queryClient.invalidateQueries(
               ['boards', activeBoardId, 'with-details'],
               { exact: true },
            );
            dispatch(setTaskAdding(false));
         },
      });
   };

   const initialValues = {
      boardId: activeBoardId,
      title: '',
      description: '',
      subtasks: ['', ''],
      status: taskAddingColumn,
   };

   const submit = (values: SubmitValues) => {
      console.log(values);

      const { subtasks } = values;
      const editedSubtasks = subtasks.map((subtask) => ({
         title: subtask,
      }));
      createTask({ ...values, subtasks: editedSubtasks });
   };

   return {
      initialValues,
      submit,
   };
};
