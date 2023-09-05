import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
   setSubmissionTrigger,
   setTaskEditing,
   setExistingTask,
   setBoardEditing,
   setIsExistingBoard,
   setXsBoardsOpen,
} from '../../../../main/store';

export enum ModalTypes {
   TaskManager,
   TaskEditor,
   BoardEditor,
   Remover,
   XsBoards,
}

export const useAppModal = () => {
   const {
      taskManaging,
      taskEditing,
      boardEditing,
      deletingBoard,
      deletingTask,
      xsBoardsOpen,
   } = useAppSelector((state) => state.modals);
   const open =
      taskManaging ||
      taskEditing ||
      boardEditing ||
      deletingBoard ||
      deletingTask ||
      xsBoardsOpen;

   const dispatch = useAppDispatch();

   const type = deletingBoard
      ? ModalTypes.Remover
      : taskManaging
      ? ModalTypes.TaskManager
      : taskEditing
      ? ModalTypes.TaskEditor
      : boardEditing
      ? ModalTypes.BoardEditor
      : xsBoardsOpen
      ? ModalTypes.XsBoards
      : ModalTypes.Remover;

   function closeRemover() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   function closeTaskManager() {
      dispatch(setSubmissionTrigger(true));
   }

   function closeTaskEditor() {
      dispatch(setTaskEditing(false));
      dispatch(setExistingTask(false));
   }

   function closeBoardEditor() {
      dispatch(setBoardEditing(false));
      dispatch(setIsExistingBoard(false));
   }

   function closeXsBoards() {
      dispatch(setXsBoardsOpen(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskManager]: closeTaskManager,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.BoardEditor]: closeBoardEditor,
         [ModalTypes.XsBoards]: closeXsBoards,
      }[type]);

   return { type, open, getOnClose };
};
