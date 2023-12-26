import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   selectActiveTaskId,
   selectActiveBoardId,
   selectActiveCategoryName,
   setDeleteModalMode,
   selectDeleteModalMode,
} from '../../../../../../main/store';
import {
   useAppSelector,
   useAppDispatch,
   deleteQueryNames,
   useDeleteQuery,
} from '../../../../hooks';
import { DeleteModalTypes } from '../../../../../types';

export const useHandlers = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();

   const mode = useAppSelector(selectDeleteModalMode);

   const activeTaskId = useAppSelector(selectActiveTaskId);
   const activeBoardId = useAppSelector(selectActiveBoardId);
   const activeCategory = useAppSelector(selectActiveCategoryName);

   function emptyArgument() {}

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
   const deleteBoard = () => {
      boardQuery.mutate(emptyArgument(), {
         onSuccess: async () => {
            await queryClient.invalidateQueries(['boards', 'by-categories'], {
               exact: true,
            });
            handleClose();
            pathname.includes('boards/') && navigate(-1);
         },
      });
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
