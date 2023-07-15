// import { BasicModal, OptionalModal } from './modalTypes';
import { DeleteModal } from './DeleteModal';
import { Modal } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { setDeletingBoard, setDeletingTask } from '../../../../main/slices/modalElsSlice';

// export type ModalProps = {
//    type: MODAL_TYPES;
// };

export enum MODAL_TYPES {
   // taskAddEdit = 'taskAddEdit',
   // taskManage = 'taskManage',
   // boardManage = 'boardManage',
   delete = 'delete',
   temp = 'temp'
}

const getModal = (type: MODAL_TYPES) =>
   ({
      [MODAL_TYPES.delete]: DeleteModal,
      [MODAL_TYPES.temp]: DeleteModal,

      // [MODAL_TYPES.optional]: OptionalModal,
   }[type]);


export const AppModal: React.FC = () => {
   const {
      taskManaging,
      taskEditing,
      boardManaging,
      deletingBoard,
      deletingTask,
   } = useAppSelector((state) => state.modals);

   const dispatch = useAppDispatch()

   const type = deletingBoard ? MODAL_TYPES.delete : MODAL_TYPES.temp

   function closeDeletingModal() {
      dispatch(setDeletingBoard(false));
      dispatch(setDeletingTask(false));
   }

   const getOnClose = (type: MODAL_TYPES) =>
   ({
      [MODAL_TYPES.delete]: closeDeletingModal,
      [MODAL_TYPES.temp]: closeDeletingModal,

      // [MODAL_TYPES.optional]: OptionalModal,
   }[type]);

   

   const CustomModal = getModal(type);
   const onClose = getOnClose(type)
   return (
      <Modal 
         open={deletingBoard || deletingTask} 
         onClose={onClose}
      >
         <CustomModal />
      </Modal>
   );
};

export * from './useAppModal';
