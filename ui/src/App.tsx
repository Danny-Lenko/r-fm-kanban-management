import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { useDragDrop, useColorMode } from './library/common/hooks';

import {
   AllBoards,
   Board,
   SignIn,
   SignUp,
   PrivateRoutes,
   Backlog,
   MasonryGrid,
} from './modules';
import { AppModal } from './library/common/components';
import { TestingPage } from './modules/TestingPage/TestingPage';

export const ColorModeContext = createContext({ toggleClrMode: () => {} });

function App() {
   const { theme, colorMode } = useColorMode();
   const { handleDragDrop } = useDragDrop();

   return (
      <ThemeProvider theme={theme}>
         <ColorModeContext.Provider value={colorMode}>
            <CssBaseline />
            <DragDropContext onDragEnd={handleDragDrop}>
               <Routes>
                  <Route element={<PrivateRoutes />}>
                     <Route element={<AllBoards />} path='/'>
                        <Route element={<Backlog />} path='' />
                        <Route
                           element={<MasonryGrid />}
                           path='categories-grid'
                        />
                     </Route>

                     <Route element={<Board />} path='boards/:id' />
                  </Route>

                  <Route element={<SignIn />} path='/sign-in' />
                  <Route element={<SignUp />} path='/sign-up' />

                  {/* =============================== Testing Page =============================== */}
                  <Route element={<TestingPage />} path='testing-page' />
               </Routes>
            </DragDropContext>
            <AppModal />
         </ColorModeContext.Provider>
      </ThemeProvider>
   );
}

export default App;
