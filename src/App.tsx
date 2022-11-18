// import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { ToggleColorMode } from './library/utilities/ToggleColorMode'
// modules


function App() {
  const myColorMode = ToggleColorMode()

  return(
    <ThemeProvider theme = { myColorMode.theme } >
      <CssBaseline />

      <Typography variant='h1'>hello App</Typography>
      <br/>
      <br/>


      <Typography variant='h2'>Typography variant h2</Typography>
      <Typography variant='h3'>Typography variant h3</Typography>
      <Typography variant='h4'>Typography variant h4</Typography>
      <Typography variant='h5'>Typography variant h5</Typography>

      {/* 
        <Routes>
        </Routes> 
      */}

    </ThemeProvider >
  );
}

export default App;
