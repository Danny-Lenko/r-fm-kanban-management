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
                        <Route element={<MasonryGrid />} path='/' />
                        <Route element={<Backlog />} path='/backlog' />
                     </Route>

                     <Route element={<Board />} path='/:board' />
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
