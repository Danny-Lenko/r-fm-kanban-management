import { Modal } from '@mui/material';
import {
   CategoryCreator,
   BoardUpdate,
   BoardCreate,
   useAppModal,
   ModalTypes,
   DeleteModal,
   CssContent,
   AddTaskModal,
   XsBoardsModal,
} from '.';

const getModal = (type: ModalTypes) =>
   ({
      [ModalTypes.CategoryCreator]: CategoryCreator,
      [ModalTypes.BoardUpdate]: BoardUpdate,
      [ModalTypes.BoardCreate]: BoardCreate,
      [ModalTypes.TaskEditor]: AddTaskModal,
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
