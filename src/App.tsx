// import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { ColorModeToggler, ColorModeContext } from './library/utilities/ColorModeToggler'
import Appbar from './library/common/components/Appbar/Appbar';
import PersistentDrawerLeft from './library/common/components/Drawer/Drawer';
import Main from './library/common/components/Main/Main';
import { useAppSelector } from './library/common/hooks/hooks';
import TaskManage from './library/common/components/TaskManager/ManageTaskModal';
// modules


function App() {
  const myTheme = ColorModeToggler()
  // const taskManaging = useAppSelector(state => state.data.taskManaging)
  const taskManaging = useAppSelector(state => state.modals.taskManaging)

  return (
    <ThemeProvider theme={myTheme.theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', overflowX: 'hidden'}}>
        <Appbar />

        <ColorModeContext.Provider value={myTheme.colorMode}>
          <PersistentDrawerLeft />
        </ColorModeContext.Provider>
        
        <Main />
      </Box>

      {
        taskManaging && <TaskManage />
      }
    </ThemeProvider >
  );
}

export default App;
