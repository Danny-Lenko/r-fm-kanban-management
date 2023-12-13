import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
   useAppSelector,
   useAppDispatch,
} from '../../../../library/common/hooks';
import {
   setCategoryIsCreating,
   setTaskAdding,
   setTaskAddingColumn,
} from '../../../../main/store/modals/modalSlice';
import { AppBtn, DotsMenu } from '../../../../library/common/components';
import { selectActiveBoard } from '../../../../main/store';

import { CssBox, XsPlusButton } from '.';

interface Props {
   xsScreen: boolean;
   isHome: boolean;
}

export const ButtonsBox: React.FC<Props> = ({ xsScreen, isHome }) => {
   const activeBoard = useAppSelector(selectActiveBoard);
   const dispatch = useAppDispatch();

   const editTask = () => {
      dispatch(setTaskAddingColumn(''));
      dispatch(setTaskAdding(true));
   };

   const addNewCategory = () => {
      dispatch(setCategoryIsCreating(true));
   };

   const xsButtonProps = {
      disabled: !activeBoard.columns[0],
      color: 'primary' as 'primary',
      onClick: isHome ? addNewCategory : editTask,
      children: isHome ? '+ Add Category' : '+ Add New Task',
   };

   const appBtnProps = {
      buttonSize: 'small' as 'small',
      ...xsButtonProps,
   };

   return (
      <CssBox>
         {xsScreen ? (
            <XsPlusButton {...xsButtonProps}>
               <AddRoundedIcon />
            </XsPlusButton>
         ) : (
            <AppBtn {...appBtnProps} />
         )}

         <DotsMenu isTaskMenu={false} />
      </CssBox>
   );
};
