import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../hooks';
import {
   setTaskManaging,
   setTaskEditing,
   setExistingTask,
   setBoardIsExisting,
   setBoardEditing,
   setBoardDeleting,
   setTaskDeleting,
} from '../../../../main/store/modals/modalSlice';

export const DotsMenuItem = ({ option, handleClose }: any) => {
   const dispatch = useAppDispatch();

   const handleEditBoard = () => {
      dispatch(setBoardIsExisting(true));
      dispatch(setBoardEditing(true));
   };

   const handleEditTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setExistingTask(true));
      dispatch(setTaskEditing(true));
   };

   const handleDeleteBoard = () => {
      dispatch(setBoardDeleting(true));
   };

   const handleDeleteTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setTaskDeleting(true));
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
