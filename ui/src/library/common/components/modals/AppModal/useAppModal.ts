import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
   setTaskAdding,
   setExistingTask,
   setBoardUpdating,
   setBoardIsExisting,
   setXsBoardsOpen,
   selectTaskAdding,
   selectBoardUpdating,
   selectBoardCreating,
   selectXsBoardsOpen,
   setCategoryIsCreating,
   selectCategoryIsCreating,
   selectDeleteModalMode,
   setDeleteModalMode,
   setBoardCreating,
} from '../../../../../main/store';

export enum ModalTypes {
   CategoryCreator,
   BoardUpdate,
   BoardCreate,
   TaskEditor,
   Remover,
   XsBoards,
}

export const useAppModal = () => {
   const categoryIsCreating = useAppSelector(selectCategoryIsCreating);
   const boardUpdating = useAppSelector(selectBoardUpdating);
   const boardCreating = useAppSelector(selectBoardCreating);
   const taskEditing = useAppSelector(selectTaskAdding);
   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);
   const isDeleting = !!useAppSelector(selectDeleteModalMode) || false;

   const open =
      categoryIsCreating ||
      boardUpdating ||
      boardCreating ||
      taskEditing ||
      xsBoardsOpen ||
      isDeleting;

   const dispatch = useAppDispatch();

   const type = categoryIsCreating
      ? ModalTypes.CategoryCreator
      : boardUpdating
      ? ModalTypes.BoardUpdate
      : boardCreating
      ? ModalTypes.BoardCreate
      : taskEditing
      ? ModalTypes.TaskEditor
      : xsBoardsOpen
      ? ModalTypes.XsBoards
      : ModalTypes.Remover;

   function closeCategoryCreator() {
      dispatch(setCategoryIsCreating(false));
   }

   function closeBoardUpdate() {
      dispatch(setBoardUpdating(false));
      dispatch(setBoardIsExisting(false));
   }

   function closeBoardCreate() {
      dispatch(setBoardCreating(false));
   }

   function closeTaskEditor() {
      dispatch(setTaskAdding(false));
      dispatch(setExistingTask(false));
   }

   function closeRemover() {
      dispatch(setDeleteModalMode(null));
   }

   function closeXsBoards() {
      dispatch(setXsBoardsOpen(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.CategoryCreator]: closeCategoryCreator,
         [ModalTypes.BoardUpdate]: closeBoardUpdate,
         [ModalTypes.BoardCreate]: closeBoardCreate,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.XsBoards]: closeXsBoards,
      }[type]);

   return { type, open, getOnClose };
};
