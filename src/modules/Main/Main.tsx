import { Routes, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { openDrawer } from '../../main/slices/drawerSlice';

import { CssMain, EyeBtn } from '.';
import { Board, NoColumnsBoard } from '..';
import { CssDrawerHeader } from '../../library/common/components';

import { ReactComponent as eyeIcon } from '../../resources/assets/icon-show-sidebar.svg';

export const Main = () => {
   const { open } = useAppSelector((state) => state.drawer);
   const { activeBoard, boards } = useAppSelector((state) => state.data);

   const dispatch = useAppDispatch();

   const theme = useTheme();
   const sxScreen = useMediaQuery(theme.breakpoints.down('sm'));

   const handleOpenDrawer = () => {
      dispatch(openDrawer('open'));
   };

   return (
      <CssMain open={open}>
         <CssDrawerHeader /> {/* native mui gap under the appbar */}
         <Routes>
            <Route
               path='/'
               element={
                  boards[0] && activeBoard.columns.length !== 0 ? (
                     <Board />
                  ) : (
                     <NoColumnsBoard />
                  )
               }
            />
            <Route
               path=':name'
               element={
                  activeBoard.columns.length === 0 ? (
                     <NoColumnsBoard />
                  ) : (
                     <Board />
                  )
               }
            />
         </Routes>
         {!sxScreen && (
            <EyeBtn
               color='primary'
               icon={eyeIcon}
               onClick={handleOpenDrawer}
            ></EyeBtn>
         )}
      </CssMain>
   );
};
