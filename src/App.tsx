import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { CssBaseline, ThemeProvider } from '@mui/material';

import {
   ColorModeToggler,
   ColorModeContext,
} from './library/utilities/ColorModeToggler';
import { swapColumns } from './main/store';
import { useAppDispatch } from './library/common/hooks';

import { Layout, Main } from './modules';
import { AppModal } from './library/common/components';

function App() {
   const myTheme = ColorModeToggler();

   const dispatch = useAppDispatch();

   const handleDragDrop: OnDragEndResponder = (results) => {
      const { source, destination, type } = results;

      if (!destination) return;

      if (
         source.droppableId === destination.droppableId &&
         source.index === destination.index
      )
         return;

      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const indexes = { sourceIndex, destinationIndex };
      
      if (type === 'columns') {
         return dispatch(swapColumns(indexes));
      }
      console.log(results);
   };

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
