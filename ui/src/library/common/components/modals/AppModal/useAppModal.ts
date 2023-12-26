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
   setCategoryIsCreating,
   selectCategoryIsCreating,
   selectDeleteModalMode,
   setDeleteModalMode,
} from '../../../../../main/store';

export enum ModalTypes {
   TaskEditor,
   BoardEditor,
   Remover,
   XsBoards,
   CategoryCreator,
}

export const useAppModal = () => {
   // task modals
   const taskEditing = useAppSelector(selectTaskAdding);
   // const taskDeleting = useAppSelector(selectTaskDeleting);
   // board modals
   const boardEditing = useAppSelector(selectBoardEditing);
   // const boardDeleting = useAppSelector(selectBoardDeleting);

   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);

   const categoryIsCreating = useAppSelector(selectCategoryIsCreating);

   const isDeleting = !!useAppSelector(selectDeleteModalMode) || false;

   const open =
      taskEditing ||
      boardEditing ||
      // boardDeleting ||
      // taskDeleting ||
      categoryIsCreating ||
      xsBoardsOpen ||
      isDeleting;

   const dispatch = useAppDispatch();

   const type =
      // boardDeleting
      //    ? ModalTypes.Remover
      //    :
      taskEditing
         ? ModalTypes.TaskEditor
         : boardEditing
         ? ModalTypes.BoardEditor
         : categoryIsCreating
         ? ModalTypes.CategoryCreator
         : xsBoardsOpen
         ? ModalTypes.XsBoards
         : ModalTypes.Remover;

   function closeRemover() {
      // dispatch(setBoardDeleting(false));
      // dispatch(setTaskDeleting(false));
      dispatch(setDeleteModalMode(null));
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

   function closeCategoryCreator() {
      dispatch(setCategoryIsCreating(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.BoardEditor]: closeBoardEditor,
         [ModalTypes.XsBoards]: closeXsBoards,
         [ModalTypes.CategoryCreator]: closeCategoryCreator,
      }[type]);

   return { type, open, getOnClose };
};
