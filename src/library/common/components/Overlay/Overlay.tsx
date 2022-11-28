import Box from '@mui/material/Box'
import { useAppDispatch } from '../../hooks/hooks';
import { closeTaskManage } from '../../../../main/slices/dataSlice';

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
               dispatch(closeTaskManage('close'))
            }
         }}
         className='overlay'
      >
         {props.children}
      </Box>
   );
}
 
export default Overlay;