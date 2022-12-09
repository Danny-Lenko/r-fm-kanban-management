import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { Formik } from 'formik';
import { closeTaskEditor } from '../../../../../main/slices/modalElsSlice';
import { schema } from './validationYup';
import { setBoards, assignActiveBoard } from '../../../../../main/slices/dataSlice';

const AddEditTaskFormik = (props: any) => {
   const boards = useAppSelector(state => state.data.boards)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const dispatch = useAppDispatch()

   return (
      <Formik
         initialValues={{
            title: '',
            description: '',
            subtasks: ['', ''],
            status: cols[0].name
         }}
         validationSchema={schema}
         onSubmit={(values) => {
            const activeCol = cols.find(col => col.name === values.status)
            const newTask = {
               ...values,
               subtasks: values.subtasks.map(sub => ({ title: sub, isCompleted: false })),
               completedSubtasks: 0,
               id: activeCol!.tasks.length
            }

            const boardsUpdated = boards.map(board => board.id !== activeBoard.id ? board : {
               ...board,
               columns: board.columns.map(col => col.id !== activeCol!.id ? col : {
                  ...col,
                  tasks: [...col.tasks, newTask]
               })
            })

            dispatch(setBoards(boardsUpdated))
            dispatch(assignActiveBoard(activeBoardId))
            dispatch(closeTaskEditor('close'))
         }}
      >
         {props.children}
      </Formik>
   );
}

export default AddEditTaskFormik;

