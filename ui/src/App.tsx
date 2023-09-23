import { DragDropContext } from 'react-beautiful-dnd';
import { CssBaseline, ThemeProvider } from '@mui/material';

import {
   ColorModeToggler,
   ColorModeContext,
} from './library/utilities/ColorModeToggler';
import { useDragDrop } from './library/common/hooks';

import { AllBoards, Board, Layout, SignUp } from './modules';
import { AppModal } from './library/common/components';

import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './modules/Router/PrivateRoutes';

import { SignIn } from './modules';


function App() {
   const myTheme = ColorModeToggler();
   const { handleDragDrop } = useDragDrop();

   return (
      <ThemeProvider theme={myTheme.theme}>
         <ColorModeContext.Provider value={myTheme.colorMode}>
            <CssBaseline />
            <DragDropContext onDragEnd={handleDragDrop}>
               <Routes>
                  <Route element={<PrivateRoutes />}>
                     <Route element={<AllBoards />} path='/' />

                     <Route
                        element={
                           <Layout>
                              <Board />
                           </Layout>
                        }
                        path='/:board'
                     />
                  </Route>

                  <Route element={<SignIn />} path='/sign-in' />
                  <Route element={<SignUp />} path='/sign-up' />
               </Routes>
            </DragDropContext>
            <AppModal />
         </ColorModeContext.Provider>
      </ThemeProvider>
   );
}

export default App;
