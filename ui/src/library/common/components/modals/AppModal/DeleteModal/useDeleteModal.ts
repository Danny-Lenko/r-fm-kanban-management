import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
   setBoardDeleting,
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
// import { generateId } from '../../../../../utilities/utils';
// import { deleteQueryNames } from '../../../../hooks/api/useDeleteQuery';

export const useDeleteModal = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const activeTaskId = useAppSelector(selectActiveTaskId);
   const activeBoardId = useAppSelector(selectActiveBoardId);
   const boardDeleting = useAppSelector(selectBoardDeleting);

   const taskById = getQueryNames.taskById;
   const { isLoading, error, data } = useGetQuery<ITask>(
      taskById,
      activeTaskId,
   );

   const queryClient = useQueryClient();
   const deleteTaskById = deleteQueryNames.taskById;
   const query = useDeleteQuery(
      deleteTaskById as keyof typeof deleteQueryNames,
      activeTaskId,
   );
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

   const deleteTask = async () => {
      await query.mutateAsync();
      queryClient.invalidateQueries(['boards', activeBoardId, 'with-details'], {
         exact: true,
      });
      handleClose();
   };
   function handleClose() {
      dispatch(setBoardDeleting(false));
      dispatch(setTaskDeleting(false));
   }

   const handleDelete = deleteTask;
   // const handleDelete = boardDeleting ? deleteBoard : deleteTask;

   const name = boardDeleting ? 'THIS BOARD' : data?.title;

   return {
      boardDeleting,
      name,
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
