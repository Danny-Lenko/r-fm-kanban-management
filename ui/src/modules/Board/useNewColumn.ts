import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import {
   selectActiveBoardInfo,
   selectBoards,
   setBoards,
   setActiveBoardId,
} from '../../main/store';
import { COLUMNCOLORS } from '../../library/common/constants';
// import { generateId } from '../../library/utilities/utils';

export const useNewColumn = () => {
   const boards = useAppSelector(selectBoards);
   const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   const { columns } = activeBoard!;
   const dispatch = useAppDispatch();

   // const addNewColumn = () => {
   //    const boardsUpdated = boards.map((board) => {
   //       const { id, columns } = board;

   //       return id !== activeBoardId
   //          ? board
   //          : {
   //               ...board,
   //               columns: [
   //                  ...board.columns,
   //                  {
   //                     id: generateId(),
   //                     name: `NewColumn${columns.length + 1}`,
   //                     tasks: [],
   //                     color: COLUMNCOLORS[columns.length]
   //                        ? COLUMNCOLORS[columns.length]
   //                        : '#E4EBFA',
   //                  },
   //               ],
   //            };
   //    });

   //    dispatch(setBoards(boardsUpdated));
   //    dispatch(setActiveBoardId(activeBoardId));
   // };

   const addNewColumn = () => console.log('tempo')

   return { columns, addNewColumn };
};
