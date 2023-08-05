import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
   setSubmissionTrigger,
   setTaskEditing,
   setExistingTask,
   setBoardEditing,
   setIsExistingBoard,
} from '../../../../main/slices';

export enum ModalTypes {
   TaskManager,
   TaskEditor,
   BoardEditor,
   Remover,
}

export const useAppModal = () => {
   const {
      taskManaging,
      taskEditing,
      boardEditing,
      deletingBoard,
      deletingTask,
   } = useAppSelector((state) => state.modals);
   const open =
      taskManaging ||
      taskEditing ||
      boardEditing ||
      deletingBoard ||
      deletingTask;

   const dispatch = useAppDispatch();

   const type = deletingBoard
      ? ModalTypes.Remover
      : taskManaging
      ? ModalTypes.TaskManager
      : taskEditing
      ? ModalTypes.TaskEditor
      : ModalTypes.BoardEditor;

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

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskManager]: closeTaskManager,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.BoardEditor]: closeBoardEditor,
      }[type]);

   return { type, open, getOnClose };
};
