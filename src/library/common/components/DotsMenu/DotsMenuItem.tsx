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

   const handleEditBoard = () => {
      dispatch(setIsExistingBoard(true));
      dispatch(setBoardEditing(true));
   };

   const handleEditTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setExistingTask(true));
      dispatch(setTaskEditing(true));
   };

   const handleDeleteBoard = () => {
      dispatch(setDeletingBoard(true));
   };

   const handleDeleteTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setDeletingTask(true));
   };

   const itemStyles = {
      color:
         option.split(' ')[0] === 'Delete' ? 'destructCustom.main' : 'inherit',
   };

   return (
      <MenuItem
         sx={itemStyles}
         selected={option === 'Pyxis'}
         onClick={() => {
            switch (option) {
               case 'Edit Task':
                  handleEditTask();
                  break;
               case 'Edit Board':
                  handleEditBoard();
                  break;
               case 'Delete Board':
                  handleDeleteBoard();
                  break;
               default:
                  handleDeleteTask();
            }
            handleClose();
         }}
      >
         {option}
      </MenuItem>
   );
};
