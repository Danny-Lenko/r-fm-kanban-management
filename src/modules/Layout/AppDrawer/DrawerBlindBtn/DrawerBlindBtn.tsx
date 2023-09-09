import { Stack, SvgIcon } from '@mui/material';

import { useAppDispatch } from '../../../../library/common/hooks';
import { closeDrawer } from '../../../../main/store/drawer/drawerSlice';

import { CssButton } from '.';

import { ReactComponent as BlindIcon } from '../../../../resources/assets/icon-hide-sidebar.svg';

export const DrawerBlindBtn = () => {
   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(closeDrawer());
   };

   return (
      <CssButton variant='text' onClick={handleClick}>
         <Stack direction='row'>
            <SvgIcon component={BlindIcon} />
            <span>Hide Sidebar</span>
         </Stack>
      </CssButton>
   );
};
