import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { ColorModeToggler, ColorModeContext } from './library/utilities/ColorModeToggler'
import Appbar from './library/common/components/Appbar/Appbar';
import PersistentDrawerLeft from './library/common/components/Drawer/Drawer';
import Main from './library/common/components/Main/Main';
import { useAppSelector } from './library/common/hooks/hooks';
import TaskManage from './library/common/components/ManageTaskModal/ManageTaskModal';
import AddEditTaskModal from './library/common/components/EditAddTaskModal/EditAddTaskModal';
import BoardManagerModal from './library/common/components/BoardManagerModal/BoardManagerModal';
import DeleteModal from './library/common/components/DeleteModal/DeleteModal';

function App() {
  const myTheme = ColorModeToggler()
  const {
    taskManaging,
    taskEditing,
    boardManaging,
    deletingBoard,
    deletingTask
  } = useAppSelector(state => state.modals)

  return (
    <ThemeProvider theme={myTheme.theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', overflowX: 'hidden' }}>

        <ColorModeContext.Provider value={myTheme.colorMode}>
          <Appbar />
          <PersistentDrawerLeft />
        </ColorModeContext.Provider>

        <Main />
      </Box>

      {
        taskManaging && <TaskManage />
      }
      {
        taskEditing && <AddEditTaskModal />
      }
      {
        boardManaging && <BoardManagerModal />
      }
      {
        (deletingBoard || deletingTask) && <DeleteModal />
      }
    </ThemeProvider >
  );
}

export default App;
