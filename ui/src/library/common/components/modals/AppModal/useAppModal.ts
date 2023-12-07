import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
   setBoardDeleting,
   setTaskDeleting,
   setSubmissionTrigger,
   setTaskAdding,
   setExistingTask,
   setBoardEditing,
   setBoardIsExisting,
   setXsBoardsOpen,
   selectTaskAdding,
   selectTaskDeleting,
   selectBoardEditing,
   selectBoardDeleting,
   selectXsBoardsOpen,
} from '../../../../../main/store';

export enum ModalTypes {
   TaskEditor,
   BoardEditor,
   Remover,
   XsBoards,
}

export const useAppModal = () => {
   // task modals
   const taskEditing = useAppSelector(selectTaskAdding);
   const taskDeleting = useAppSelector(selectTaskDeleting);
   // board modals
   const boardEditing = useAppSelector(selectBoardEditing);
   const boardDeleting = useAppSelector(selectBoardDeleting);

   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);

   const open =
      taskEditing ||
      boardEditing ||
      boardDeleting ||
      taskDeleting ||
      xsBoardsOpen;

   const dispatch = useAppDispatch();

   const type = boardDeleting
      ? ModalTypes.Remover
      : taskEditing
      ? ModalTypes.TaskEditor
      : boardEditing
      ? ModalTypes.BoardEditor
      : xsBoardsOpen
      ? ModalTypes.XsBoards
      : ModalTypes.Remover;

   function closeRemover() {
      dispatch(setBoardDeleting(false));
      dispatch(setTaskDeleting(false));
   }

   function closeTaskEditor() {
      dispatch(setTaskAdding(false));
      dispatch(setExistingTask(false));
   }

   function closeBoardEditor() {
      dispatch(setBoardEditing(false));
      dispatch(setBoardIsExisting(false));
   }

   function closeXsBoards() {
      dispatch(setXsBoardsOpen(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.BoardEditor]: closeBoardEditor,
         [ModalTypes.XsBoards]: closeXsBoards,
      }[type]);

   return { type, open, getOnClose };
};
