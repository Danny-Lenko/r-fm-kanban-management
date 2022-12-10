import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { Formik } from 'formik';
import { closeTaskEditor, disableEditorExisting } from '../../../../../main/slices/modalElsSlice';
import { schema } from './editorValidationYup';
import { setBoards, assignActiveBoard } from '../../../../../main/slices/dataSlice';

const AddEditTaskFormik = (props: any) => {
   const boards = useAppSelector(state => state.data.boards)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const activeTask = useAppSelector(state => state.data.managedTask)
   const isExisting = useAppSelector(state => state.modals.isExistingTask)
   const dispatch = useAppDispatch()

   console.log(activeTask)

   return (
      <Formik
         initialValues={
            isExisting ? {
               title: activeTask.title,
               description: activeTask.description,
               subtasks: activeTask.subtasks.map(sub => sub.title),
               status: activeTask.status
            }
            : {
               title: '',
               description: '',
               subtasks: ['', ''],
               status: cols[0].name
            }
         }

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
            dispatch(disableEditorExisting('disable'))
         }}
      >
         {props.children}
      </Formik>
   );
}

export default AddEditTaskFormik;

