import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { Formik } from 'formik';
import { createBoard } from './createBoard';
import { schema } from './boardFormikValidation'

const BoardManagerFormik = (props: any) => {
   const { 
      boards, 
      activeBoard, 
      activeBoardId,
      activeColId,
      managedTask: activeTask
   } = useAppSelector(state => state.data)
   const { columns: cols } = activeBoard
   const isExisting = useAppSelector(state => state.modals.isExistingBoard)
   const dispatch = useAppDispatch()
   
   return (
      <Formik
         initialValues={
            isExisting ? {
               name: activeTask.title,
               // columns: activeTask.subtasks.map(sub => sub.title),
            }
            : {
               name: '',
               columns: ['', ''],
            }
         }

         validationSchema={schema}

         onSubmit={ (values) => {
            const submissionParams = {values, cols, boards, activeBoard, activeBoardId, dispatch, activeTask, activeColId}
            // return isExisting ? saveChanges(submissionParams) : createTask(submissionParams)
            return createBoard(submissionParams)
         }}
      >
         {props.children}
      </Formik>
   );
}

export default BoardManagerFormik;

