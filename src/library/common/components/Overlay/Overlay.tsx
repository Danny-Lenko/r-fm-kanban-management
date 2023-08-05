import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setTaskEditing,
   setTaskManaging,
   setExistingTask,
   setBoardEditing,
   setIsExistingBoard,
} from '../../../../main/slices/modalSlice';

const Overlay = (props: any) => {
   const dispatch = useAppDispatch();
   const { taskManaging, taskEditing, boardEditing } = useAppSelector(
      (state) => state.modals,
   );

   const overlayStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      minWidth: '100%',
      minHeight: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
   };

   return (
      <Box
         sx={overlayStyles}
         onClick={(e) => {
            const target = e.target as HTMLElement;
            // if (taskManaging && target.classList.contains('overlay')) {
            //    dispatch(setTaskManaging(false));
            //    props.submitHandler();
            // }
            // if (taskEditing && target.classList.contains('overlay')) {
            //    dispatch(setTaskEditing(false));
            //    dispatch(setExistingTask(false));
            // }
            if (boardEditing && target.classList.contains('overlay')) {
               dispatch(setBoardEditing(false));
               dispatch(setIsExistingBoard(false));
            }
         }}
         className='overlay'
      >
         {props.children}
      </Box>
   );
};

export default Overlay;
