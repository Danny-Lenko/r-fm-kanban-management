import { Modal } from '@mui/material';
import { useAppModal, ModalTypes, DeleteModal, StyledContent, ManageTaskModal } from '.';

const getModal = (type: ModalTypes) =>
   ({
      [ModalTypes.Remover]: DeleteModal,
      [ModalTypes.TaskManager]: ManageTaskModal,
      [ModalTypes.Temp]: DeleteModal,
      // [MODAL_TYPES.optional]: OptionalModal,
   }[type]);

export const AppModal: React.FC = () => {
   const { type, open, getOnClose } = useAppModal();

   const CustomModal = getModal(type);
   const onClose = getOnClose(type);
   return (
      <Modal open={open} onClose={onClose}>
         <StyledContent>
            <CustomModal />
         </StyledContent>
      </Modal>
   );
};
