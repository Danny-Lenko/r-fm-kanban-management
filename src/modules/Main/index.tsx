import { useAppSelector } from '../../library/common/hooks';
import { DrawerHeader } from '../../library/common/components/DrawerHeader';
import CustomBtn from '../../library/common/components/CustomBtn';
import { ReactComponent as eyeIcon } from '../../resources/assets/icon-show-sidebar.svg';
import { openDrawer } from '../../main/slices/drawerSlice';
import { Routes, Route } from 'react-router-dom';
import ZeroBoard from '../ZeroBoard/ZeroBoard';
import UsualBoard from '../UsualBoard/UsualBoard';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

import { MainEl, EyeBtn } from './mainStyles';

export const Main = () => {
   const open = useAppSelector((state) => state.drawer.open);
   const { activeBoard, boards } = useAppSelector((state) => state.data);

   const theme = useTheme();
   const sxScreen = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <MainEl open={open}>
         <DrawerHeader />

         <Routes>
            <Route
               path='/'
               element={
                  boards[0] && activeBoard.columns.length !== 0 ? (
                     <UsualBoard />
                  ) : (
                     <ZeroBoard />
                  )
               }
            />
            <Route
               path=':name'
               element={
                  activeBoard.columns.length === 0 ? (
                     <ZeroBoard />
                  ) : (
                     <UsualBoard />
                  )
               }
            />
         </Routes>

         {!sxScreen && (
            <EyeBtn
            // classname='eyeBtn'
            // sizeSm={false}
            // color='primary'
            // text=''
            // icon={eyeIcon}
            // onclick={openDrawer}
            // isAction={true}
            />
         )}
      </MainEl>
   );
};
