import { Modal } from '@mui/material';
import {
   useAppModal,
   ModalTypes,
   DeleteModal,
   StyledContent,
   ManageTaskModal,
   EditAddTaskModal,
   EditBoardModal,
   XsBoardsModal,
} from '.';

const getModal = (type: ModalTypes) =>
   ({
      [ModalTypes.TaskManager]: ManageTaskModal,
      [ModalTypes.TaskEditor]: EditAddTaskModal,
      [ModalTypes.BoardEditor]: EditBoardModal,
      [ModalTypes.Remover]: DeleteModal,
      [ModalTypes.XsBoards]: XsBoardsModal,
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
