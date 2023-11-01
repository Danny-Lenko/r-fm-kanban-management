import { Modal } from '@mui/material';
import {
   useAppModal,
   ModalTypes,
   DeleteModal,
   CssContent,
   // ManageTaskModal,
   AddTaskModal,
   EditBoardModal,
   XsBoardsModal,
} from '.';

const getModal = (type: ModalTypes) =>
   ({
      // [ModalTypes.TaskManager]: ManageTaskModal,
      [ModalTypes.TaskEditor]: AddTaskModal,
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
      <Modal open={open} onClose={onClose} sx={{ zIndex: 20000 }}>
         <CssContent>
            <CustomModal />
         </CssContent>
      </Modal>
   );
};
