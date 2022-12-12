import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { closeTaskEditor, closeTaskManager, disableEditorExisting } from '../../../../main/slices/modalElsSlice';

const Overlay = (props:any) => {
   const dispatch = useAppDispatch()
   const isManagingTask = useAppSelector(state => state.modals.taskManaging)
   const isEditingTask = useAppSelector(state => state.modals.taskEditing)

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
      zIndex: 10000
   }

   return (
      <Box
         sx={overlayStyles}
         onClick={(e) => {
            const target = e.target as HTMLElement
            if (isManagingTask && target.classList.contains('overlay')) {
               dispatch(closeTaskManager('close'))
               props.submitHandler()
            }
            if (isEditingTask && target.classList.contains('overlay')) {
               dispatch(closeTaskEditor('close'))
               dispatch(disableEditorExisting('disable'))
            }
         }}
         className='overlay'
      >
         {props.children}
      </Box>
   );
}
 
export default Overlay;