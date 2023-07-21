import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
   setTaskManaging,
   setSubmissionTrigger,
} from '../../../../main/slices';

export enum ModalTypes {
   // taskAddEdit = 'taskAddEdit',
   // boardManage = 'boardManage',
   TaskManager = 'taskManager',
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
      : ModalTypes.Temp;

   function closeRemover() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   function closeTaskManager() {
      dispatch(setSubmissionTrigger(true));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Remover]: closeRemover,
         [ModalTypes.TaskManager]: closeTaskManager,
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
