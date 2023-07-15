import { DeleteModal } from './DeleteModal';
import { Modal } from '@mui/material';
import { useAppModal, ModalTypes } from './useAppModal';

const getModal = (type: ModalTypes) =>
   ({
      [ModalTypes.Delete]: DeleteModal,
      [ModalTypes.Temp]: DeleteModal,

      // [MODAL_TYPES.optional]: OptionalModal,
   }[type]);

export const AppModal: React.FC = () => {
   const { type, open, getOnClose } = useAppModal();

   const CustomModal = getModal(type);
   const onClose = getOnClose(type);
   return (
      <Modal open={open} onClose={onClose}>
         <CustomModal />
      </Modal>
   );
};

export * from './useAppModal';
