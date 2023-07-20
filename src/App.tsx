import { CssBaseline, ThemeProvider } from '@mui/material';
import {
   ColorModeToggler,
   ColorModeContext,
} from './library/utilities/ColorModeToggler';
import { AppModal } from './library/common/components';

import { Layout, Main } from './modules';

function App() {
   const myTheme = ColorModeToggler();

   return (
      <ThemeProvider theme={myTheme.theme}>
         <ColorModeContext.Provider value={myTheme.colorMode}>
            <CssBaseline />
            <Layout>
               <Main />
            </Layout>

            <AppModal/>

         </ColorModeContext.Provider>
      </ThemeProvider>
   );
}

export default App;
