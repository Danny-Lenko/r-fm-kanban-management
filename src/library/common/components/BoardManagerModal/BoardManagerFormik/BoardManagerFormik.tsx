import { useAppSelector, useAppDispatch } from '../../../hooks';
import { Formik } from 'formik';
import { createBoard } from './createBoard';
import { saveBoardChanges } from './saveBoardChanges';
import { schema } from './boardFormikValidation';

const BoardManagerFormik = (props: any) => {
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
         validationSchema={schema}
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
            // return createBoard(submissionParams)
         }}
      >
         {props.children}
      </Formik>
   );
};

export default BoardManagerFormik;
