import {
   setBoardEditing,
   setIsExistingBoard,
} from '../../../../../../main/slices/modalSlice';
import {
   setBoards,
   assignActiveBoard,
} from '../../../../../../main/slices/dataSlice';

import { ISumbissionParams } from '../../../../../interfaces';

export type BoardValues = {
   name: string;
   columns: string[];
};

interface Props extends ISumbissionParams {
   values: BoardValues;
}

// saveBoardChanges
export const saveBoardChanges = ({
   values,
   boards,
   dispatch,
   activeBoard,
}: Props) => {
   const boardUpdated = {
      id: activeBoard.id,
      columns: values.columns.map(
         (col, i) =>
            activeBoard.columns[i] && { ...activeBoard.columns[i], name: col },
      ),
      name: values.name,
      path: values.name
         .split(' ')
         .map((word) => word.toLowerCase())
         .join('-'),
   };

   const boardsUpdated = [...boards];
   boardsUpdated[activeBoard.id] = boardUpdated;

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(activeBoard.id));
   dispatch(setIsExistingBoard(false));
   dispatch(setBoardEditing(false));
};

// createBoard
export const createBoard = ({ values, boards, dispatch }: Props) => {
   const newBoard = {
      id: boards.length,
      columns: values.columns.map((col, i) => ({
         id: i,
         name: col,
         tasks: [],
      })),
      name: values.name,
      path: values.name
         .split(' ')
         .map((word) => word.toLowerCase())
         .join('-'),
   };

   const boardsUpdated = [...boards, newBoard];

   dispatch(setBoards(boardsUpdated));
   dispatch(assignActiveBoard(boards.length));
   dispatch(setBoardEditing(false));
};
