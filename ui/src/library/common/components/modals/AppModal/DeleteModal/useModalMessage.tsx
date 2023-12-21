import {
   selectActiveBoardId,
   selectActiveCategoryName,
   selectActiveTaskId,
} from '../../../../../../main/store';
import { IBoard, ITask } from '../../../../../interfaces';
import { DeleteModalTypes } from '../../../../../types';
import { getQueryNames, useAppSelector, useGetQuery } from '../../../../hooks';

export const useModalMessage = (mode: DeleteModalTypes) => {
   const categoryName = useAppSelector(selectActiveCategoryName);

   const boardId = useAppSelector(selectActiveBoardId);
   const boardById = getQueryNames.boardDetails;
   const { data: board } = useGetQuery<IBoard>(boardById, boardId, {
      enabled: mode === 'board',
   });

   const taskId = useAppSelector(selectActiveTaskId);
   const taskById = getQueryNames.taskById;
   const { data: task } = useGetQuery<ITask>(taskById, taskId, {
      enabled: mode === 'task',
   });

   const modals = {
      category: (
         <>
            Are you sure you want to delete the <b>‘{categoryName}’</b>{' '}
            category? This action will remove all boards and tasks and cannot be
            reversed.
         </>
      ),

      board: (
         <>
            Are you sure you want to delete the <b>‘${board?.name}’</b> board?
            This action will remove all columns and tasks and cannot be
            reversed.
         </>
      ),

      task: (
         <>
            Are you sure you want to delete the <b>‘{task?.title}’</b> task and
            its subtasks? This action cannot be reversed.
         </>
      ),
   };

   return {
      message: modals[mode],
   };
};
