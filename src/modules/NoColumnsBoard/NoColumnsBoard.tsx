import { setBoards, assignActiveBoard } from '../../main/slices/dataSlice';
import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { COLUMNCOLORS } from '../../library/common/constants';

import { CssBoard, CssText, CssColumnButton } from '.';

export const NoColumnsBoard = () => {
   const { boards, activeBoardId } = useAppSelector((state) => state.data);
   const dispatch = useAppDispatch();

   function addCol() {
      const boardsUpdated = boards.map((board) =>
         board.id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: [
                    {
                       id: 0,
                       color: COLUMNCOLORS[0],
                       name: 'NEWCOLUMN1',
                       tasks: [],
                    },
                 ],
              },
      );
      dispatch(setBoards(boardsUpdated));
      dispatch(assignActiveBoard(activeBoardId));
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