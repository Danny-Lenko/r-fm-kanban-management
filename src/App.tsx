// import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { ToggleColorMode } from './library/utilities/ToggleColorMode'
import Appbar from './library/common/components/Appbar/Appbar';
import PersistentDrawerLeft from './library/common/components/Drawer/Drawer';
import Main from './library/common/components/Main/Main';
// modules


function App() {
  const myColorMode = ToggleColorMode()

  return (
    <ThemeProvider theme={myColorMode.theme} >
      <CssBaseline />

      <Box sx={{ display: 'flex' }}>
        <Appbar />
        <PersistentDrawerLeft />
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
