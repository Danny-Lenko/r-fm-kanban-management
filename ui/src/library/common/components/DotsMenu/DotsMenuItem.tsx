import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListItemText, SvgIconTypeMap, SvgIconProps } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskIcon from '@mui/icons-material/Task';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
   setTaskManaging,
   setBoardIsExisting,
   setBoardUpdating,
   setTaskDeleting,
   setTaskModalExpansionId,
   setTaskCardWasDragged,
   selectActiveTaskId,
   setEditMode,
   setDeleteModalMode,
} from '../../../../main/store';

import { CssListIcon, CssMenuItem } from './CssComponents';

interface Props {
   option: string;
   handleClose: () => void;
}

export const DotsMenuItem: React.FC<Props> = ({ option, handleClose }) => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const id = useAppSelector(selectActiveTaskId);
   const dispatch = useAppDispatch();

   const optionAction = option
      .split(' ')
      // filter allows using the edit icon for edit mode
      .filter((word) => word.toLowerCase() !== 'enter')[0]
      .toLowerCase();

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
      edit: createIconComponent(EditOutlinedIcon),
      exit: createIconComponent(ExitToAppIcon),
   };

   const getIcon = (option: string) => {
      return icons[option as keyof typeof icons];
   };

   const handleEditBoard = () => {
      dispatch(setBoardIsExisting(true));
      dispatch(setBoardUpdating(true));
   };

   const handleDeleteBoard = () => {
      dispatch(setDeleteModalMode('board'));
   };

   const handleRedirect = () => {
      navigate(`${pathname}/tasks/${id}`);
   };

   const handleCloseModal = () => {
      dispatch(setTaskModalExpansionId(null));
      dispatch(setTaskCardWasDragged(false));
   };

   const handleDeleteTask = () => {
      dispatch(setTaskManaging(false));
      dispatch(setTaskDeleting(true));
   };

   const handleEditMode = () => {
      dispatch(setEditMode(true));
   };

   const handleExitEditMode = () => {
      dispatch(setEditMode(false));
   };

   const handleClick = () => {
      switch (option) {
         case 'Open Task Page':
            handleRedirect();
            break;
         case 'Close Modal':
            handleCloseModal();
            break;
         case 'Edit Board':
            handleEditBoard();
            break;
         case 'Delete Board':
            handleDeleteBoard();
            break;
         case 'Enter edit mode':
            handleEditMode();
            break;
         case 'Exit edit mode':
            handleExitEditMode();
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
