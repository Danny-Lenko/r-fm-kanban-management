import { useQueryClient } from '@tanstack/react-query';

import { Values, SubmitValues } from '.';
import {
   selectActiveBoardId,
   selectTaskAddingColumn,
   setTaskAdding,
} from '../../../../../../../main/store';
import {
   useAppSelector,
   useAppDispatch,
   postDataTypes,
   usePostQuery,
} from '../../../../../hooks';

export const useFormikValues = () => {
   const dispatch = useAppDispatch();
   const taskAddingColumn = useAppSelector(selectTaskAddingColumn);
   const activeBoardId = useAppSelector(selectActiveBoardId);

   const queryClient = useQueryClient();
   const dataType = postDataTypes.newTask.name;
   const query = usePostQuery<SubmitValues, void>(
      dataType as keyof typeof postDataTypes,
   );
   const createTask = async (values: SubmitValues) => {
      await query.mutateAsync(values, {
         onSuccess: (data) => {
            queryClient.invalidateQueries([
               'boards',
               activeBoardId,
               'with-details',
            ]);
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

   const submit = (values: Values) => {
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
