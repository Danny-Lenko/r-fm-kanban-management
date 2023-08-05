import { Formik, FormikProps } from 'formik';

import { schemaBoard, saveBoardChanges, createBoard } from '.';
import { useAppSelector, useAppDispatch } from '../../../../hooks';

type Values = FormikProps<{
   name: string;
   columns: string[];
}>;

type Props = {
   children: (props: Values) => React.ReactNode;
};

export const BoardFormik: React.FC<Props> = (props) => {
   const {
      boards,
      activeBoard,
      activeBoardId,
      activeColId,
      managedTask: activeTask,
   } = useAppSelector((state) => state.data);
   const { columns: cols } = activeBoard;
   const isExisting = useAppSelector((state) => state.modals.isExistingBoard);
   const dispatch = useAppDispatch();

   return (
      <Formik
         initialValues={
            isExisting
               ? {
                    name: activeBoard.name,
                    columns: activeBoard.columns.map((col) => col.name),
                 }
               : {
                    name: '',
                    columns: ['', ''],
                 }
         }
         validationSchema={schemaBoard}
         onSubmit={(values) => {
            const submissionParams = {
               values,
               cols,
               boards,
               activeBoard,
               activeBoardId,
               dispatch,
               activeTask,
               activeColId,
            };
            return isExisting
               ? saveBoardChanges(submissionParams)
               : createBoard(submissionParams);
         }}
      >
         {props.children}
      </Formik>
   );
};
