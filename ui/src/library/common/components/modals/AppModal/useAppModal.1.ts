import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
   setTaskAdding,
   setExistingTask,
   setBoardUpdating,
   setBoardIsExisting,
   setXsBoardsOpen,
   selectTaskAdding,
   selectBoardUpdating,
   selectXsBoardsOpen,
   setCategoryIsCreating,
   selectCategoryIsCreating,
   selectDeleteModalMode,
   setDeleteModalMode,
   setBoardCreating,
} from '../../../../../main/store';
import { ModalTypes } from './useAppModal';

export const useAppModal = () => {
   // task modals
   const taskEditing = useAppSelector(selectTaskAdding);
   // board modals
   const boardEditing = useAppSelector(selectBoardUpdating);

   const xsBoardsOpen = useAppSelector(selectXsBoardsOpen);

   const categoryIsCreating = useAppSelector(selectCategoryIsCreating);

   const isDeleting = !!useAppSelector(selectDeleteModalMode) || false;

   const open =
      taskEditing ||
      boardEditing ||
      categoryIsCreating ||
      xsBoardsOpen ||
      isDeleting;

   const dispatch = useAppDispatch();

   const type = taskEditing
      ? ModalTypes.TaskEditor
      : boardEditing
      ? ModalTypes.BoardUpdate
      : categoryIsCreating
      ? ModalTypes.CategoryCreator
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
