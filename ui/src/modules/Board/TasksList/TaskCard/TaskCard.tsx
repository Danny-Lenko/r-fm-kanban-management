import ReactDOM from 'react-dom';
import React, {
   SetStateAction,
   useCallback,
   useEffect,
   useLayoutEffect,
   useState,
} from 'react';

import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// import { Dispatch } from 'react';

import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { ITask } from '../../../../library/interfaces/interfaces';
import {
   useAppDispatch,
   useAppSelector,
} from '../../../../library/common/hooks';
import {
   selectActiveTaskId,
   setActiveColumndId,
   setActiveTaskId,
   setTaskManaging,
} from '../../../../main/store';

import { CssCard, CssTitle, CssSubtasks, ExpandedCard, Overlay } from '.';

import { motion, AnimatePresence, usePresence } from 'framer-motion';
import { Box } from '@mui/material';

interface Props extends ITask {
   columnId: string;
   provided: DraggableProvided;
   snapshot: DraggableStateSnapshot;
}

export const TaskCard: React.FC<Props> = React.memo(
   ({ title, subtasks, id, columnId, provided, snapshot }) => {
      const dispatch = useAppDispatch();

      const [isPresent, safeToRemove] = usePresence();

      const expandId = useAppSelector(selectActiveTaskId);

      const completed =
         subtasks.length &&
         subtasks.filter(({ isCompleted }) => isCompleted).length;

      const handleExpand = (id?: string) => {
         if (id) {
            return dispatch(setActiveTaskId(id));
         }
         dispatch(setActiveTaskId(null));
      };

      const handleCollapse = () => {
         return dispatch(setActiveTaskId(null));
      };

      useEffect(() => {
         console.log('provided');

         dispatch(setActiveTaskId(null));
         dispatch(setActiveTaskId(''));

         return () => {
            dispatch(setActiveTaskId(null));
            dispatch(setActiveTaskId(''));
         };
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
                  key={id}
                  onClick={() => handleExpand(id)}
                  initial={false}
               >
                  <CssTitle>{title}</CssTitle>
                  <CssSubtasks>
                     {subtasks.length
                        ? `${completed} of ${subtasks.length} subtasks`
                        : 'no subtasks yet'}
                  </CssSubtasks>
               </CssCard>
            </Box>

            <ModalWrapper
               isShowing={!!expandId}
               dispatch={dispatch}
               setId={setActiveTaskId}
            >
               <ExpandedCard
                  layoutId={id}
                  initial={false}
                  onClick={() => {
                     handleCollapse();
                  }}
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
   isShowing: boolean;
   dispatch: Dispatch;
   setId: (id: string) => AnyAction;
}

const ModalWrapper = ({
   children,
   isShowing,
   dispatch,
   setId,
}: ModalWrapperProps) =>
   ReactDOM.createPortal(
      <AnimatePresence
         initial={false}
         onExitComplete={() => {
            dispatch(setId(''));
         }}
         mode='wait'
      >
         {isShowing && <Overlay>{children}</Overlay>}
      </AnimatePresence>,
      document.body,
   );

export default ModalWrapper;
