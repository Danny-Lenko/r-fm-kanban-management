import { ListItemText, SvgIconTypeMap } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskIcon from '@mui/icons-material/Task';
import CloseIcon from '@mui/icons-material/Close';

import { IconProps, SvgIconProps } from '@mui/material';

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

import { CssListIcon, CssMenuItem } from './CssComponents';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
   option: string;
   handleClose: () => void;
}

export const DotsMenuItem: React.FC<Props> = ({ option, handleClose }) => {
   const dispatch = useAppDispatch();
   const optionAction = option.split(' ')[0].toLowerCase();

   const navigate = useNavigate();
   const { pathname } = useLocation();

   const createIconComponent = (
      Component: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
         muiName: string;
      },
      rest?: SvgIconProps,
   ) => {
      return <Component fontSize='small' {...rest} />;
   };

   const icons = {
      open: createIconComponent(TaskIcon),
      close: createIconComponent(CloseIcon),
      delete: createIconComponent(DeleteForeverIcon, { color: 'warning' }),
   };

   const getIcon = (option: string) => {
      return icons[option as keyof typeof icons];
   };

   const handleEditBoard = () => {
      dispatch(setBoardIsExisting(true));
      dispatch(setBoardEditing(true));
   };

   // const handleEditTask = () => {
   //    dispatch(setTaskManaging(false));
   //    dispatch(setExistingTask(true));
   //    dispatch(setTaskEditing(true));
   // };

   const handleRedirect = () => {
      console.log('redirecting...');
      navigate(`${pathname}/tasks/id`);
   };

   const handleDeleteBoard = () => {
      dispatch(setBoardDeleting(true));
   };

   const handleDeleteTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setTaskDeleting(true));
   };

   const handleClick = () => {
      switch (option) {
         case 'Open Task Page':
            handleRedirect();
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
   };

   return (
      <CssMenuItem onClick={handleClick} option={optionAction}>
         <ListItemText>{option}</ListItemText>
         <CssListIcon>{getIcon(optionAction)}</CssListIcon>
      </CssMenuItem>
   );
};
