import {
   setBoardManaging,
   setIsExistingBoard,
} from '../../../../../main/slices/modalSlice';
import {
   setBoards,
   assignActiveBoard,
} from '../../../../../main/slices/dataSlice';

export const saveBoardChanges = ({
   values,
   boards,
   dispatch,
   activeBoard,
}: any) => {
   const boardUpdated = {
      id: activeBoard.id,
      columns: values.columns.map((col: any, i: number) =>
         activeBoard.columns[i]
            ? { ...activeBoard.columns[i], name: col }
            : { id: i, name: col, tasks: [] },
      ),
      name: values.name,
      path: values.name
         .split(' ')
         .map((word: any) => word.toLowerCase())
         .join('-'),
   };

   const boardsUpdated = [...boards];
   boardsUpdated[activeBoard.id] = boardUpdated;

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(activeBoard.id));
   dispatch(setIsExistingBoard(false));
   dispatch(setBoardManaging(false));
};
