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
import {} from '../../../../../main/store/data/dataSelectors';

export const useDeleteModal = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { activeColumnId } = useAppSelector(selectActiveColumnInfo);
   const { activeTask, activeTaskId } = useAppSelector(selectActiveTaskInfo);

   const boardDeleting = useAppSelector(selectBoardDeleting);

   const dispatch = useAppDispatch();

   const navigate = useNavigate();

   const deleteBoard = () => {
      const boardsUpdated = boards
         .filter((board) => board.id !== activeBoardId)
         .map((board, i) => ({ ...board, id: i.toString() }));

      dispatch(setBoards(boardsUpdated));
      navigate('/');

      if (boards.length <= 1) {
         const zeroBoards = [
            { id: '0', name: 'Zero Board', columns: [], path: 'zero-board' },
         ];
         dispatch(setBoards(zeroBoards));
      }

      dispatch(setActiveBoardId('0'));
      handleClose();
   };

   const deleteTask = () => {
      const boardsUpdated = boards.map((board, i) =>
         board.id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: board.columns.map((col) =>
                    col.id !== activeColumnId
                       ? col
                       : {
                            ...col,
                            tasks: col.tasks
                               .filter((task) => task.id !== activeTaskId)
                               .map((task, i) => ({ ...task, id: i })),
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
