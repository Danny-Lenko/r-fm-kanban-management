import React, { useState, useLayoutEffect, useRef } from 'react';
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

      const ref = useRef<HTMLDivElement | null>(null);

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = () => {
         setExpandId(id);
      };

      const handleCollapse = () => {
         console.log(ref.current);

         setExpandId(null);
      };

      useLayoutEffect(() => {
         console.log('provided');
         // setExpandId('hello');
         // setExpandId(null);
         // setExpandId('');
      }, [provided]);

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
                  ref={ref}
                  // itemRef={ref}
                  layoutId={id}
                  onClick={handleCollapse}
                  key={id}
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
