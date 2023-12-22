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

   // const categoryName = useAppSelector(selectActiveCategoryName);
   // const taskName = task?.title

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
      board: () => null,
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
      // boardDeleting,
      handleDelete,
      handleClose,
   };
};

// const deleteBoard = () => {
//    const boardsUpdated = boards.filter(
//       (board) => board.id !== activeBoardId,
//    );
//    dispatch(setBoards(boardsUpdated));

//    navigate('/');

//    if (boards.length <= 1) {
//       const zeroBoards = [
//          {
//             id: generateId(),
//             name: 'Zero Board',
//             columns: [],
//             path: 'zero-board',
//          },
//       ];
//       dispatch(setBoards(zeroBoards));
//       dispatch(setActiveBoardId(zeroBoards[0].id));
//    } else {
//       dispatch(setActiveBoardId(boardsUpdated[0].id));
//    }

//    handleClose();
// };
