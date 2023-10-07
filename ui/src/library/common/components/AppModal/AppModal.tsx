import { Modal } from '@mui/material';
import {
   useAppModal,
   ModalTypes,
   DeleteModal,
   CssContent,
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

interface Props {
   propType?: ModalTypes;
}

export const AppModal: React.FC<Props> = ({ propType }) => {
   const { type, open, getOnClose } = useAppModal();

   const CustomModal = getModal(propType || type);
   const onClose = getOnClose(type);
   return (
      <Modal open={open} onClose={onClose}>
         <CssContent>
            <CustomModal />
         </CssContent>
      </Modal>
   );
};
