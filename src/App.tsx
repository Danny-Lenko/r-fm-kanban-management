import { DragDropContext } from 'react-beautiful-dnd';
import { CssBaseline, ThemeProvider } from '@mui/material';

import {
   ColorModeToggler,
   ColorModeContext,
} from './library/utilities/ColorModeToggler';
import { useDragDrop } from './library/common/hooks';

import { Layout, Main } from './modules';
import { AppModal } from './library/common/components';

function App() {
   const myTheme = ColorModeToggler();
   const { handleDragDrop } = useDragDrop();

   return (
      <ThemeProvider theme={myTheme.theme}>
         <ColorModeContext.Provider value={myTheme.colorMode}>
            <CssBaseline />

            <DragDropContext onDragEnd={handleDragDrop}>
               <Layout>
                  <Main />
               </Layout>
            </DragDropContext>

            <AppModal />
         </ColorModeContext.Provider>
      </ThemeProvider>
   );
}

export default App;
