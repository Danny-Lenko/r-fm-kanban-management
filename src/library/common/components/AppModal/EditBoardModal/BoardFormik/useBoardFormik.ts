import { useAppSelector, useAppDispatch } from '../../../../hooks';

import { BoardValues, saveBoardChanges, createBoard } from '.';
import {
   selectActiveBoardInfo,
   selectActiveColumnId,
   selectActiveTask,
   selectBoards,
} from '../../../../../../main/store';

export const useBoardFormik = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard;

   const activeColumnId = useAppSelector(selectActiveColumnId);
   const activeTask = useAppSelector(selectActiveTask);

   const isExisting = useAppSelector((state) => state.modals.isExistingBoard);
   const dispatch = useAppDispatch();

   const initialValues = isExisting
      ? {
           name: activeBoard.name,
           columns: activeBoard.columns.map((col) => col.name),
        }
      : {
           name: '',
           columns: ['', ''],
        };

   const submissionParams = {
      columns,
      boards,
      activeBoard,
      activeBoardId,
      dispatch,
      activeTask,
      activeColumnId,
   };

   const submit = (values: BoardValues) =>
      isExisting
         ? saveBoardChanges({ values, ...submissionParams })
         : createBoard({ values, ...submissionParams });

   return {
      initialValues,
      submit,
   };
};
