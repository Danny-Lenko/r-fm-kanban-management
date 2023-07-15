import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setDeletingBoard,
   setDeletingTask,
} from '../../../../main/slices/modalElsSlice';

export enum ModalTypes {
   // taskAddEdit = 'taskAddEdit',
   // taskManage = 'taskManage',
   // boardManage = 'boardManage',
   Delete = 'delete',
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

   const type = deletingBoard ? ModalTypes.Delete : ModalTypes.Temp;

   function closeDeletingModal() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   const getOnClose = (type: ModalTypes) =>
      ({
         [ModalTypes.Delete]: closeDeletingModal,
         [ModalTypes.Temp]: closeDeletingModal,

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
