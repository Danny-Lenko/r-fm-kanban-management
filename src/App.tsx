// import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { ColorModeToggler, ColorModeContext } from './library/utilities/ColorModeToggler'
import Appbar from './library/common/components/Appbar/Appbar';
import PersistentDrawerLeft from './library/common/components/Drawer/Drawer';
import Main from './library/common/components/Main/Main';
// modules


function App() {
  const myTheme = ColorModeToggler()

  return (
    <ThemeProvider theme={myTheme.theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex' }}>
        <Appbar />

        <ColorModeContext.Provider value={myTheme.colorMode}>
          <PersistentDrawerLeft />
        </ColorModeContext.Provider>
        
        <Main />
      </Box>
      {/* 
        <Routes>
        </Routes> 
      */}
    </ThemeProvider >
  );
}

export default App;
