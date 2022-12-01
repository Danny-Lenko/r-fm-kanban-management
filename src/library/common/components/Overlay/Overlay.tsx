import Box from '@mui/material/Box'
import { useAppDispatch } from '../../hooks/hooks';
import { closeTaskManager } from '../../../../main/slices/dataSlice';

const Overlay = (props:any) => {
   const dispatch = useAppDispatch()

   const overlayStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
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
            if (target.classList.contains('overlay')) {
               dispatch(closeTaskManager('close'))
               props.submitHandler()
            }
         }}
         className='overlay'
      >
         {props.children}
      </Box>
   );
}
 
export default Overlay;