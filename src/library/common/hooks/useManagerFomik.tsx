import { useFormik } from 'formik';
import { manageActiveTask, assignActiveBoard, manageColumnsChange } from '../../../main/slices/dataSlice';
import { countCompletedSubtasks } from '../../utilities/utils';
import { useAppSelector, useAppDispatch } from './hooks';

const useManagerFormik = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const activeBoardId = useAppSelector(state => state.data.activeBoardId)
   const activeColId = useAppSelector(state => state.data.activeColId)
   const dispatch = useAppDispatch()

   const cols = useAppSelector(state => state.data.activeBoard.columns)
   const activeCol = cols.find(col => col.id === activeColId)

   const formik = useFormik({
      initialValues: {
         checked: task.subtasks.filter(sub => sub.isCompleted).map(sub => sub.title),
         status: task.status
      },
      validationSchema: null,

      onSubmit: (values) => {
         const managedSubs = {
            ...task,
            status: values.status,
            subtasks: task.subtasks.map(sub => values.checked.some(val => val === sub.title) ? { ...sub, isCompleted: true } : { ...sub, isCompleted: false })
         }
         const editedTask = {
            ...managedSubs,
            completedSubtasks: countCompletedSubtasks(managedSubs)
         }
         dispatch(manageActiveTask(editedTask))

         // task status changing logic
         const taskIsAlien = editedTask.status !== activeCol?.name
         let editedCols = [...cols]
         if (taskIsAlien) {
            editedCols = cols.map(col =>
               col.id === activeColId ? {
                  ...col,
                  tasks: col.tasks.filter(task => task.id !== editedTask.id)
                     .map((task, i) => ({ ...task, id: i }))
               }
                  : col.name === editedTask.status ? {
                     ...col,
                     tasks: [editedTask, ...col.tasks].map((task, i) => ({ ...task, id: i }))
                  }
                     : col
            )
            dispatch(manageColumnsChange(editedCols))
         }
         // changes the state responsible for render
         dispatch(assignActiveBoard(activeBoardId))
      },
   });

   return { formik, cols, task };
}

export default useManagerFormik;