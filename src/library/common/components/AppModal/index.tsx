// import { BasicModal, OptionalModal } from './modalTypes';
import { DeleteModal } from './DeleteModal';
import { Modal } from '@mui/material';


export type ModalProps = {
   type: MODAL_TYPES;
};

export enum MODAL_TYPES {
   // taskAddEdit = 'taskAddEdit',
   // taskManage = 'taskManage',
   // boardManage = 'boardManage',
   delete = 'delete',
}

const getModal = (type: MODAL_TYPES) =>
   ({
      [MODAL_TYPES.delete]: DeleteModal,

      // [MODAL_TYPES.optional]: OptionalModal,
   }[type]);

export const AppModal: React.FC<ModalProps> = ({ type }) => {
   const CustomModal = getModal(type);
   return <CustomModal />;
};

export * from './useAppModal';
