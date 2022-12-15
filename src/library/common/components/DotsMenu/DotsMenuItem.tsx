import MenuItem from '@mui/material/MenuItem'
import { useAppDispatch } from '../../hooks/hooks';
import { 
   closeTaskManager, 
   openTaskEditor, 
   enableEditorExisting, 
   setIsExistingBoard,
   openBoardManager
} from '../../../../main/slices/modalElsSlice';

const DotsMenuItem = ({option, handleClose}:any) => {
   const dispatch = useAppDispatch()

   return (
      <MenuItem
         sx={{ color: option.split(' ')[0] === 'Delete' ? 'destructCustom.main' : 'inherit' }}
         selected={option === 'Pyxis'}
         onClick={() => {
            if (option === 'Edit Task') {
               dispatch(closeTaskManager('close'))
               dispatch(enableEditorExisting('enable'))
               dispatch(openTaskEditor('open'))
            }
            if (option === 'Edit Board') {
               dispatch(setIsExistingBoard(true))
               dispatch(openBoardManager('open'))
            }
            handleClose()
         }}
      >
         {option}
      </MenuItem>
   );
}

export default DotsMenuItem;