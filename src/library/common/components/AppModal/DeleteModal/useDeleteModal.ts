import { useNavigate } from 'react-router-dom';
import {
   setDeletingBoard,
   setDeletingTask,
   setBoards,
   assignActiveBoard,
} from '../../../../../main/slices';
import { useAppSelector, useAppDispatch } from '../../../hooks';

export const useDeleteModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { deletingBoard } = useAppSelector((state) => state.modals);
   const { activeBoard, activeColId, activeTaskId, boards } = useAppSelector(
      (state) => state.data,
   );

   const activeCol = activeBoard.columns.find((col) => col.id === activeColId);
   const activeTask = activeCol?.tasks.find((task) => task.id === activeTaskId);

   const deleteBoard = () => {
      const boardsUpdated = boards
         .filter((board) => board.id !== activeBoard.id)
         .map((board, i) => ({ ...board, id: i }));

      dispatch(setBoards(boardsUpdated));
      navigate('/');

      if (boards.length <= 1) {
         const zeroBoards = [
            { id: 0, name: 'Zero Board', columns: [], path: 'zero-board' },
         ];
         dispatch(setBoards(zeroBoards));
      }

      dispatch(assignActiveBoard(0));
      handleClose();
   };

   const deleteTask = () => {
      const boardsUpdated = boards.map((board, i) =>
         board.id !== activeBoard.id
            ? board
            : {
                 ...board,
                 columns: board.columns.map((col) =>
                    col.id !== activeColId
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
      dispatch(assignActiveBoard(activeBoard.id));
      handleClose();
   };

   function handleClose() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   const handleDelete = deletingBoard ? deleteBoard : deleteTask;

   return { deletingBoard, activeBoard, activeTask, handleDelete, handleClose };
};
