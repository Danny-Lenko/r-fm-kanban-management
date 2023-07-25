import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
   setSubmissionTrigger,
   setTaskEditing,
   setExistingTask,
} from '../../../../main/slices';

export enum ModalTypes {
   TaskManager = 'taskManager',
   TaskEditor = 'taskEditor',
   Remover = 'remover',
   Temp = 'temp',
}

export const useAppModal = () => {
   const {
      taskManaging,
      taskEditing,
      boardManaging,
      deletingBoard,
      deletingTask,
   } = useAppSelector((state) => state.modals);
   const open =
      taskManaging ||
      taskEditing ||
      boardManaging ||
      deletingBoard ||
      deletingTask;

   const dispatch = useAppDispatch();

   const type = deletingBoard
      ? ModalTypes.Remover
      : taskManaging
      ? ModalTypes.TaskManager
      : taskEditing
      ? ModalTypes.TaskEditor
      : ModalTypes.Temp;

   function closeRemover() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   function closeTaskManager() {
      dispatch(setSubmissionTrigger(true));
   }

   function closeTaskEditor() {
      dispatch(setTaskEditing(false));
      dispatch(setExistingTask(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskManager]: closeTaskManager,
         [ModalTypes.TaskEditor]: closeTaskEditor,
         [ModalTypes.Temp]: closeRemover,

         // [MODAL_TYPES.optional]: OptionalModal,
      }[type]);

   return { type, open, getOnClose };
};

// export const useAppModal = () => {
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const handleOpen = () => {
//       setIsModalOpen(true);
//    };

//    const handleClose = () => {
//       setIsModalOpen(false);
//    };

//    return {
//       isModalOpen,
//       handleOpen,
//       handleClose
//    }
// }
