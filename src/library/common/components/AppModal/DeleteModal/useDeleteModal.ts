import { useNavigate } from 'react-router-dom';

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
} from '../../../../../main/store';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { generateId } from '../../../../utilities/utils';

export const useDeleteModal = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { activeColumnId } = useAppSelector(selectActiveColumnInfo);
   const { activeTask, activeTaskId } = useAppSelector(selectActiveTaskInfo);

   const boardDeleting = useAppSelector(selectBoardDeleting);

   const dispatch = useAppDispatch();

   const navigate = useNavigate();

   const deleteBoard = () => {
      const boardsUpdated = boards.filter(
         (board) => board.id !== activeBoardId,
      );
      dispatch(setBoards(boardsUpdated));

      navigate('/');

      if (boards.length <= 1) {
         const zeroBoards = [
            {
               id: generateId(),
               name: 'Zero Board',
               columns: [],
               path: 'zero-board',
            },
         ];
         dispatch(setBoards(zeroBoards));
         dispatch(setActiveBoardId(zeroBoards[0].id));
      } else {
         dispatch(setActiveBoardId(boardsUpdated[0].id));
      }

      handleClose();
   };

   const deleteTask = () => {
      const boardsUpdated = boards.map((board) =>
         board.id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: board.columns.map((col) =>
                    col.id !== activeColumnId
                       ? col
                       : {
                            ...col,
                            tasks: col.tasks.filter(
                               (task) => task.id !== activeTaskId,
                            ),
                         },
                 ),
              },
      );

      dispatch(setBoards(boardsUpdated));
      dispatch(setActiveBoardId(activeBoardId));
      handleClose();
   };

   function handleClose() {
      dispatch(setBoardDeleting(false));
      dispatch(setTaskDeleting(false));
   }

   const handleDelete = boardDeleting ? deleteBoard : deleteTask;

   return { boardDeleting, activeBoard, activeTask, handleDelete, handleClose };
};
