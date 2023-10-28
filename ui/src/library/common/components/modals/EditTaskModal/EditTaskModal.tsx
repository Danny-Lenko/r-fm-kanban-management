import { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Overlay, ExpandedCard, ModalContent } from '.';

interface Props {
   expandId: string | null;
   setExpandId: (id: string | null) => void;
   isDragging: boolean;
   title: string;
}

const exitAfterDragDrop = {
   transform: 'translate(0 0)',
   opacity: 0,
};

export const EditTaskModal = ({
   expandId,
   setExpandId,
   isDragging,
   title,
}: Props) => {
   const [wasDragged, setWasDragged] = useState(false);

   useLayoutEffect(() => {
      if (isDragging) {
         setWasDragged(true);
      }
   }, [isDragging]);

   const handleCollapse = () => {
      setExpandId(null);
      setWasDragged(false);
   };

   return ReactDOM.createPortal(
      <AnimatePresence
         initial={false}
         onExitComplete={() => setExpandId('')}
         mode='wait'
      >
         {!!expandId && (
            <Overlay onClick={handleCollapse}>
               <ExpandedCard
                  layoutId={expandId}
                  key={expandId}
                  onClick={(e) => e.stopPropagation()}
                  exit={wasDragged ? exitAfterDragDrop : undefined}
               >
                  <ModalContent id={expandId} />
               </ExpandedCard>
            </Overlay>
         )}
      </AnimatePresence>,
      document.body,
   );
};
