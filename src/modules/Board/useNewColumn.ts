import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { setBoards, assignActiveBoard } from '../../main/store/data/dataSlice';
import { COLUMNCOLORS } from '../../library/common/constants';

export const useNewColumn = () => {
   const { activeBoard, boards } = useAppSelector((state) => state.data);
   const { columns } = activeBoard;
   const dispatch = useAppDispatch();

   const addNewColumn = () => {
      const boardsUpdated = boards.map((board) => {
         const { id, columns } = board;

         return id !== activeBoard.id
            ? board
            : {
                 ...board,
                 columns: [
                    ...board.columns,
                    {
                       id: columns.length,
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
      dispatch(assignActiveBoard(activeBoard.id));
   };

   return { columns, addNewColumn };
};
