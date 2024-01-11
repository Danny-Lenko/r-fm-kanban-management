import {
   useAppSelector,
   useGetQuery,
   getQueryNames,
} from '../../../../../hooks';
import { IBoard } from '../../../../../../interfaces';
import { selectActiveBoardId } from '../../../../../../../main/store';

export const useFormikUpdate = () => {
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

   return {
      initialValues,
   };
};
