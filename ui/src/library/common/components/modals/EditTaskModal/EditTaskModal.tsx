import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

import { Overlay, ExpandedCard, ModalContent } from '.';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
   selectTaskModalExpansionId,
   selectTaskCardWasDragged,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   selectActiveBoardId,
   selectModalIsSubmitting,
} from '../../../../../main/store';

export const EditTaskModal = () => {
   const wasDragged = useAppSelector(selectTaskCardWasDragged);
   const expansionId = useAppSelector(selectTaskModalExpansionId);
   const boardId = useAppSelector(selectActiveBoardId);
   const modalIsSubmitting = useAppSelector(selectModalIsSubmitting);

   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();

   const handleExitComplete = () => {
      dispatch(setTaskModalExpansionId(''));
   };

   const handleCollapse = () => {
      if (modalIsSubmitting) return;

      queryClient.invalidateQueries(['boards', boardId, 'with-details'], {
         exact: true,
      });
      dispatch(setTaskModalExpansionId(null));
      dispatch(setTaskCardWasDragged(false));
   };

   return ReactDOM.createPortal(
      <AnimatePresence onExitComplete={handleExitComplete}>
         {!!expansionId && (
            <Overlay onClick={handleCollapse}>
               <ExpandedCard
                  layoutId={expansionId}
                  key={expansionId}
                  onClick={(e) => e.stopPropagation()}
                  exit={wasDragged ? { display: 'none' } : undefined}
               >
                  <ModalContent id={expansionId} />
               </ExpandedCard>
            </Overlay>
         )}
      </AnimatePresence>,
      document.body,
   );
};  
