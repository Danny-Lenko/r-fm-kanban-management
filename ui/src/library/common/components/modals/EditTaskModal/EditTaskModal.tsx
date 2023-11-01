import { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';

import { Overlay, ExpandedCard, ModalContent } from '.';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
   selectTaskModalExpansionId,
   selectTaskCardWasDragged,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
} from '../../../../../main/store';

interface Props {
   isDragging: boolean;
   title: string;
}

const exitAfterDragDrop = {
   transform: 'translate(0 0)',
   opacity: 0,
};

export const EditTaskModal = ({ isDragging, title }: Props) => {
   const wasDragged = useAppSelector(selectTaskCardWasDragged);
   const expansionId = useAppSelector(selectTaskModalExpansionId);
   const dispatch = useAppDispatch();

   const handleExitComplete = () => {
      dispatch(setTaskModalExpansionId(''));
   };

   useLayoutEffect(() => {
      if (isDragging) {
         dispatch(setTaskCardWasDragged(true));
      }
   }, [isDragging]);

   const handleCollapse = () => {
      dispatch(setTaskModalExpansionId(null));
      dispatch(setTaskCardWasDragged(false));
   };

   return ReactDOM.createPortal(
      <AnimatePresence
         // onExitComplete={() => dispatch(setTaskModalExpansionId(''))}
         onExitComplete={handleExitComplete}
      >
         {!!expansionId && (
            <Overlay onClick={handleCollapse}>
               <ExpandedCard
                  layoutId={expansionId}
                  key={expansionId}
                  onClick={(e) => e.stopPropagation()}
                  exit={wasDragged ? exitAfterDragDrop : undefined}
               >
                  <ModalContent id={expansionId} />
               </ExpandedCard>
            </Overlay>
         )}
      </AnimatePresence>,
      document.body,
   );
};
