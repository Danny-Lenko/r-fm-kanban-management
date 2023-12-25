import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
   setBoardDeleting,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   setTaskDeleting,
   setBoards,
   setActiveBoardId,
   selectBoards,
   selectActiveBoardInfo,
   selectActiveColumnInfo,
   selectActiveTaskInfo,
   selectBoardDeleting,
   selectActiveTaskId,
   selectActiveBoardId,
   selectActiveCategoryName,
   setDeleteModalMode,
   selectDeleteModalMode,
} from '../../../../../../main/store';
import {
   useAppSelector,
   useAppDispatch,
   getQueryNames,
   useGetQuery,
   deleteQueryNames,
   useDeleteQuery,
} from '../../../../hooks';
import { ITask } from '../../../../../interfaces';
import { DeleteModalTypes } from '../../../../../types';
// import { generateId } from '../../../../../utilities/utils';
// import { deleteQueryNames } from '../../../../hooks/api/useDeleteQuery';

export const useHandlers = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();

   const mode = useAppSelector(selectDeleteModalMode);

   const activeTaskId = useAppSelector(selectActiveTaskId);
   const activeBoardId = useAppSelector(selectActiveBoardId);
   const activeCategory = useAppSelector(selectActiveCategoryName);

   const deleteTaskById = deleteQueryNames.taskById;
   const query = useDeleteQuery(
      deleteTaskById as keyof typeof deleteQueryNames,
      activeTaskId,
   );
   const deleteTask = async () => {
      await query.mutateAsync();
      await queryClient.invalidateQueries(
         ['boards', activeBoardId, 'with-details'],
         {
            exact: true,
         },
      );
      handleClose();
   };

   const deleteBoardById = deleteQueryNames.boardById;
   const boardQuery = useDeleteQuery(
      deleteBoardById as keyof typeof deleteQueryNames,
      activeBoardId,
   );
   const deleteBoard = async () => {
      await boardQuery.mutateAsync();
      await queryClient.invalidateQueries(['boards', 'by-categories'], {
         exact: true,
      });
      handleClose();
   };

   const deleteCat = deleteQueryNames.category;
   const categoryQuery = useDeleteQuery(
      deleteCat as keyof typeof deleteQueryNames,
      activeCategory,
   );
   const deleteCategory = async () => {
      await categoryQuery.mutateAsync();
      await queryClient.invalidateQueries(['boards', 'by-categories'], {
         exact: true,
      });
      handleClose();
   };
   // const deleteTask = async () => {
   //    await query.mutateAsync(, {
   //       onSuccess: (data) => {
   //          queryClient.invalidateQueries([
   //             'boards',
   //             activeBoardId,
   //             'with-details',
   //          ]);
   //          // dispatch(setTaskDeleting(false));
   //          handleClose();
   //       },
   //    });
   // };

   const deleteHandlers = {
      category: deleteCategory,
      board: deleteBoard,
      task: deleteTask,
   };
   const handleDelete = deleteHandlers[mode as DeleteModalTypes];

   function handleClose() {
      dispatch(setTaskCardWasDragged(false));
      dispatch(setTaskModalExpansionId(null));
      dispatch(setDeleteModalMode(null));
   }

   return {
      mode,
      handleDelete,
      handleClose,
   };
};
