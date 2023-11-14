import { BoardValues, saveBoardChanges, createBoard } from '.';
import {
   useAppSelector,
   useAppDispatch,
   useGetQuery,
   getQueryNames,
} from '../../../../../hooks';
import { IBoard } from '../../../../../../interfaces';
import {
   selectActiveBoardId,
   selectActiveBoardInfo,
   selectActiveColumnId,
   selectActiveTask,
   selectBoardIsExisting,
   selectBoards,
} from '../../../../../../../main/store';

export const useBoardFormik = () => {
   // const boards = useAppSelector(selectBoards);
   // const { activeBoard, activeBoardId } = useAppSelector(selectActiveBoardInfo);
   // const { columns } = activeBoard;

   // const activeColumnId = useAppSelector(selectActiveColumnId);
   // const activeTask = useAppSelector(selectActiveTask);

   // const boardIsExisting = useAppSelector(selectBoardIsExisting);

   const boardId = useAppSelector(selectActiveBoardId);

   const boardDetails = getQueryNames.boardDetails;
   const { isLoading, error, data } = useGetQuery<IBoard>(
      boardDetails,
      boardId,
   );

   const dispatch = useAppDispatch();

   const initialValues = data
      ? {
           name: data.name,
           columns: data.columns.map((col) => col.name),
        }
      : {
           name: '',
           columns: ['', ''],
        };

   // const initialValues = {
   //    name: '',
   //    columns: ['', ''],
   // };

   // const submissionParams = {
   //    columns,
   //    boards,
   //    activeBoard,
   //    activeBoardId,
   //    dispatch,
   //    activeTask,
   //    activeColumnId,
   // };

   const submit = (values: BoardValues) =>
      initialValues.name
         ? console.log('edit board')
         : console.log('create board');
   // ? saveBoardChanges({ values, ...submissionParams })
   // : createBoard({ values, ...submissionParams });

   return {
      initialValues,
      submit,
   };
};
