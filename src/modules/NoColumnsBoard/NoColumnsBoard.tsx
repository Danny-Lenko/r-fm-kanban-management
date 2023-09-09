import {
   selectActiveBoardId,
   selectBoards,
   setBoards,
   setActiveBoardId,
} from '../../main/store';
import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { COLUMNCOLORS } from '../../library/common/constants';
import { generateId } from '../../library/utilities/utils';

import { CssBoard, CssText, CssColumnButton } from '.';

export const NoColumnsBoard = () => {
   const boards = useAppSelector(selectBoards);
   const activeBoardId = useAppSelector(selectActiveBoardId);
   const dispatch = useAppDispatch();

   function addCol() {
      const boardsUpdated = boards.map((board) =>
         board.id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: [
                    {
                       id: generateId(),
                       color: COLUMNCOLORS[0],
                       name: 'NEWCOLUMN1',
                       tasks: [],
                    },
                 ],
              },
      );
      dispatch(setBoards(boardsUpdated));
      dispatch(setActiveBoardId(activeBoardId));
   }

   return (
      <CssBoard>
         <CssText>
            This board is empty. Create a new column to get started.
         </CssText>
         <CssColumnButton onClick={addCol}>+ Add New Column</CssColumnButton>
      </CssBoard>
   );
};
