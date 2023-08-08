import { useAppSelector, useAppDispatch } from '../../../../hooks';

import { BoardValues, saveBoardChanges, createBoard } from '.';

export const useBoardFormik = () => {
   const {
      boards,
      activeBoard,
      activeBoardId,
      activeColId,
      managedTask: activeTask,
   } = useAppSelector((state) => state.data);
   const { columns } = activeBoard;
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
      activeColId,
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
