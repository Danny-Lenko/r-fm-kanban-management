import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../hooks';
import {
   setTaskManaging,
   setTaskEditing,
   setExistingTask,
   setIsExistingBoard,
   setBoardEditing,
   setDeletingBoard,
   setDeletingTask,
} from '../../../../main/slices/modalSlice';

export const DotsMenuItem = ({ option, handleClose }: any) => {
   const dispatch = useAppDispatch();

   return (
      <MenuItem
         sx={{
            color:
               option.split(' ')[0] === 'Delete'
                  ? 'destructCustom.main'
                  : 'inherit',
         }}
         selected={option === 'Pyxis'}
         onClick={() => {
            if (option === 'Edit Task') {
               dispatch(setTaskManaging(false));
               dispatch(setExistingTask(true));
               dispatch(setTaskEditing(true));
            }
            if (option === 'Edit Board') {
               dispatch(setIsExistingBoard(true));
               dispatch(setBoardEditing(true));
            }
            if (option === 'Delete Board') {
               dispatch(setDeletingBoard(true));
            }
            if (option === 'Delete Task') {
               dispatch(setTaskManaging(false));
               dispatch(setDeletingTask(true));
            }
            handleClose();
         }}
      >
         {option}
      </MenuItem>
   );
};
