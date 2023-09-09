import { v4 as uuid } from 'uuid';

import {
   setBoardEditing,
   setBoardIsExisting,
} from '../../../../../../main/store/modals/modalSlice';
import { setBoards, setActiveBoardId } from '../../../../../../main/store';

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
   boardsUpdated[+activeBoard.id] = boardUpdated;

   dispatch(setBoards(boardsUpdated));
   dispatch(setActiveBoardId(activeBoard.id));
   dispatch(setBoardIsExisting(false));
   dispatch(setBoardEditing(false));
};

// createBoard
export const createBoard = ({ values, boards, dispatch }: Props) => {
   const newBoard = {
      id: uuid(),
      columns: values.columns.map((col, i) => ({
         id: uuid(),
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
   dispatch(setActiveBoardId(newBoard.id));
   dispatch(setBoardEditing(false));
};
