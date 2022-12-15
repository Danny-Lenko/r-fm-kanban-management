import { useTheme } from '@mui/material/styles';
import { boardManagerStyles } from './boardManagerStyles';
import { useAppSelector } from '../../hooks/hooks';
import Overlay from '../Overlay/Overlay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const BoardManagerModal = () => {
   const theme = useTheme()
   const isExisting = useAppSelector(state => state.modals.isExistingBoard)

   return (
      <Overlay>
         <Paper elevation={0} sx={boardManagerStyles(theme)}>
            <Typography variant='h3'>
               { isExisting ? 'Edit board' : 'Add new board' }
            </Typography>


         </Paper>
      </Overlay>
   );
}

export default BoardManagerModal;