import { BoardValues } from '.';
import {
   useAppSelector,
   useGetQuery,
   getQueryNames,
} from '../../../../../hooks';
import { IBoard } from '../../../../../../interfaces';
import { selectActiveBoardId } from '../../../../../../../main/store';

export const useBoardFormik = () => {
   const boardId = useAppSelector(selectActiveBoardId);

   const boardDetails = getQueryNames.boardDetails;
   const { isLoading, error, data } = useGetQuery<IBoard>(
      boardDetails,
      boardId,
   );

   const initialValues = {
      name: data!.name,
      columns: data!.columns,
   };

   // const initialValues = data
   //    ? {
   //         name: data.name,
   //         //   columns: data.columns.map((col) => col.name),
   //         columns: data.columns,
   //      }
   //    : {
   //         name: '',
   //         columns: ['', ''],
   //      };

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

   // const saveBoardChanges = (values: BoardValues) => {};

   // const submit = (values: BoardValues) =>
   //    initialValues?.name ? console.log(values) : console.log('create board');
   // // ? saveBoardChanges({ values, ...submissionParams })
   // // : createBoard({ values, ...submissionParams });

   return {
      initialValues,
      // submit,
   };
};
