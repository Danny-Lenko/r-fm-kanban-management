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
   // selectTaskManaging,
   selectTaskAdding,
   selectTaskDeleting,
   selectBoardEditing,
   selectBoardDeleting,
   selectXsBoardsOpen,
} from '../../../../../main/store';

export enum ModalTypes {
   // TaskManager,
   TaskEditor,
   BoardEditor,
   Remover,
   XsBoards,
}

export const useAppModal = () => {
   // task modals
   // const taskManaging = useAppSelector(selectTaskManaging);
   const taskEditing = useAppSelector(selectTaskAdding);
   const taskDeleting = useAppSelector(selectTaskDeleting);
   // board modals
   const boardEditing = useAppSelector(selectBoardEditing);
   const boardDeleting = useAppSelector(selectBoardDeleting);

   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);

   const open =
      // taskManaging ||
      taskEditing ||
      boardEditing ||
      boardDeleting ||
      taskDeleting ||
      xsBoardsOpen;

   const dispatch = useAppDispatch();

   const type = boardDeleting
      ? ModalTypes.Remover
      // : taskManaging
      // ? ModalTypes.TaskManager
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

   // function closeTaskManager() {
   //    dispatch(setSubmissionTrigger(true));
   // }

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
         // [ModalTypes.TaskManager]: closeTaskManager,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.BoardEditor]: closeBoardEditor,
         [ModalTypes.XsBoards]: closeXsBoards,
      }[type]);

   return { type, open, getOnClose };
};
