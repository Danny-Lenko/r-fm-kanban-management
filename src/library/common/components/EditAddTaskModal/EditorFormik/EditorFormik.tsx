import { useAppSelector, useAppDispatch } from '../../../hooks';
import { Formik } from 'formik';
import { schema } from './editorFormikValidation';
import { createTask } from './editorCreateTask';
import { saveChanges } from './editorSaveChanges';

const EditorFormik = (props: any) => {
   const {
      boards,
      activeBoard,
      activeBoardId,
      activeColId,
      managedTask: activeTask,
   } = useAppSelector((state) => state.data);
   const { columns: cols } = activeBoard;
   const isExisting = useAppSelector((state) => state.modals.isExistingTask);
   const dispatch = useAppDispatch();

   return (
      <Formik
         initialValues={
            isExisting
               ? {
                    title: activeTask.title,
                    description: activeTask.description,
                    subtasks: activeTask.subtasks.map((sub) => sub.title),
                    status: activeTask.status,
                 }
               : {
                    title: '',
                    description: '',
                    subtasks: ['', ''],
                    status: cols[0].name,
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
               ? saveChanges(submissionParams)
               : createTask(submissionParams);
         }}
      >
         {props.children}
      </Formik>
   );
};

export default EditorFormik;
