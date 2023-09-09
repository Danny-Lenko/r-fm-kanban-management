import { v4 as uuid } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import {
   selectActiveBoardInfo,
   selectBoards,
   setBoards,
   setActiveBoardId,
} from '../../main/store';
import { COLUMNCOLORS } from '../../library/common/constants';

export const useNewColumn = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard!;
   const dispatch = useAppDispatch();

   const addNewColumn = () => {
      const boardsUpdated = boards.map((board) => {
         const { id, columns } = board;

         return id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: [
                    ...board.columns,
                    {
                       id: uuid(),
                       name: `NewColumn${columns.length + 1}`,
                       tasks: [],
                       color: COLUMNCOLORS[columns.length]
                          ? COLUMNCOLORS[columns.length]
                          : '#E4EBFA',
                    },
                 ],
              };
      });

      dispatch(setBoards(boardsUpdated));
      dispatch(setActiveBoardId(activeBoardId));
   };

   return { columns, addNewColumn };
};
