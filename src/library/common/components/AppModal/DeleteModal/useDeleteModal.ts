import { useNavigate } from 'react-router-dom';
import {
   setDeletingBoard,
   setDeletingTask,
   setBoards,
   setActiveBoardId,
   selectBoards,
   selectActiveBoardInfo,
   selectActiveColumnInfo,
   selectActiveTaskInfo,
} from '../../../../../main/store';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {} from '../../../../../main/store/data/dataSelector';

export const useDeleteModal = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { activeColumnId } = useAppSelector(selectActiveColumnInfo);
   const { activeTask, activeTaskId } = useAppSelector(selectActiveTaskInfo);

   const { deletingBoard } = useAppSelector((state) => state.modals);

   const dispatch = useAppDispatch();

   const navigate = useNavigate();

   const deleteBoard = () => {
      const boardsUpdated = boards
         .filter((board) => board.id !== activeBoardId)
         .map((board, i) => ({ ...board, id: i }));

      dispatch(setBoards(boardsUpdated));
      navigate('/');

      if (boards.length <= 1) {
         const zeroBoards = [
            { id: 0, name: 'Zero Board', columns: [], path: 'zero-board' },
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
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   const handleDelete = deletingBoard ? deleteBoard : deleteTask;

   return { deletingBoard, activeBoard, activeTask, handleDelete, handleClose };
};
