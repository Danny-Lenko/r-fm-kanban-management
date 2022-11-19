// import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { ToggleColorMode } from './library/utilities/ToggleColorMode'
import PersistentDrawerLeft from './library/common/components/Drawer/Drawer';
import Main from './library/common/components/Main/Main';
// modules

import CustomBtn from './library/common/components/CustomBtn/CustomBtn';


function App() {
  const myColorMode = ToggleColorMode()

  return(
    <ThemeProvider theme = { myColorMode.theme } >
      <CssBaseline />

      <PersistentDrawerLeft />
      <Main />

      {/* 
        <Routes>
        </Routes> 
      */}

    </ThemeProvider >
  );
}

export default App;
