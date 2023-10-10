import React, { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Box } from '@mui/material';

import { ITask } from '../../../../library/interfaces/interfaces';

import { CssCard, CssTitle, CssSubtasks, ExpandedCard, Overlay } from '.';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
   snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, subtasks, id, columnId, provided, snapshot }) => {
      const [expandId, setExpandId] = useState<string | null>('');

      const [isDragged, setIsDragged] = useState(false);

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = () => {
         setExpandId(id);
      };

      const handleCollapse = () => {
         setExpandId(null);
         setIsDragged(false);
      };

      useLayoutEffect(() => {
         if (snapshot.isDragging) {
            setIsDragged(true);
         }
      }, [snapshot.isDragging]);

      const exitAfterDragDrop = {
         transform: 'translate(0 0)',
         opacity: 0,
      };

      return (
         <>
            <Box
               {...provided.dragHandleProps}
               {...provided.draggableProps}
               ref={provided.innerRef}
               sx={{
                  border: (theme) =>
                     snapshot.isDragging
                        ? `2px solid ${theme.palette.primary.main}`
                        : 'none',
               }}
            >
               <CssCard
                  layoutId={id}
                  style={{
                     background: '#fff',
                  }}
                  onClick={handleExpand}
               >
                  <CssTitle>{title}</CssTitle>
                  <CssSubtasks>
                     {subtasks.length
                        ? `${completed} of ${subtasks.length} subtasks`
                        : 'no subtasks yet'}
                  </CssSubtasks>
               </CssCard>
            </Box>

            <ModalWrapper expandId={expandId} setExpandId={setExpandId}>
               <ExpandedCard
                  // ref={ref}
                  layoutId={id}
                  onClick={handleCollapse}
                  key={id}
                  exit={isDragged ? exitAfterDragDrop : undefined}
               >
                  <motion.h1>{title}</motion.h1>
               </ExpandedCard>
            </ModalWrapper>
         </>
      );
   },
);

interface ModalWrapperProps {
   children: React.ReactNode;
   expandId: string | null;
   setExpandId: (id: string) => void;
}

const ModalWrapper = ({ children, expandId, setExpandId }: ModalWrapperProps) =>
   ReactDOM.createPortal(
      <AnimatePresence
         initial={false}
         onExitComplete={() => setExpandId('')}
         mode='wait'
      >
         {!!expandId && <Overlay>{children}</Overlay>}
      </AnimatePresence>,
      document.body,
   );

export default ModalWrapper;
