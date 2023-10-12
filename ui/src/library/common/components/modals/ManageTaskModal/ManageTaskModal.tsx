import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Overlay, ExpandedCard } from '.';
import { useState, useLayoutEffect } from 'react';

interface Props {
   expandId: string | null;
   setExpandId: (id: string | null) => void;
   isDragging: boolean;
}

const exitAfterDragDrop = {
   transform: 'translate(0 0)',
   opacity: 0,
};

export const ManageTaskModal = ({
   expandId,
   setExpandId,
   isDragging,
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
                  // layoutId={id}
                  // key={id}
                  layoutId={expandId}
                  key={expandId}
                  onClick={(e) => e.stopPropagation()}
                  exit={wasDragged ? exitAfterDragDrop : undefined}
               >
                  <motion.h1>{'Hello Modal'}</motion.h1>
                  {/* <ModalContent /> */}
               </ExpandedCard>
            </Overlay>
         )}
      </AnimatePresence>,
      document.body,
   );
};
