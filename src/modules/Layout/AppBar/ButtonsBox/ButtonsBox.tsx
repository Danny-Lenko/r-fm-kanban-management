import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
   useAppSelector,
   useAppDispatch,
} from '../../../../library/common/hooks';
import { setTaskEditing } from '../../../../main/store/modals/modalSlice';
import { AppBtn, DotsMenu } from '../../../../library/common/components';

import { CssBox, XsPlusButton } from '.';

interface Props {
   xsScreen: boolean;
}

export const ButtonsBox: React.FC<Props> = ({ xsScreen }) => {
   const { activeBoard } = useAppSelector((state) => state.data);
   const dispatch = useAppDispatch();

   const editTask = () => {
      dispatch(setTaskEditing(true));
   };

   const xsButtonProps = {
      disabled: !activeBoard.columns[0],
      color: 'primary' as 'primary',
      onClick: editTask,
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
            <AppBtn {...appBtnProps}>+ Add New Task</AppBtn>
         )}

         <DotsMenu isTaskMenu={false} />
      </CssBox>
   );
};
