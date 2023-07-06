import { CssBaseline, ThemeProvider } from '@mui/material';
import {
   ColorModeToggler,
   ColorModeContext,
} from './library/utilities/ColorModeToggler';
import { useAppSelector } from './library/common/hooks';
import TaskManage from './library/common/components/ManageTaskModal/ManageTaskModal';
import AddEditTaskModal from './library/common/components/EditAddTaskModal/EditAddTaskModal';
import BoardManagerModal from './library/common/components/BoardManagerModal/BoardManagerModal';
import DeleteModal from './library/common/components/DeleteModal/DeleteModal';

import { Layout, Main } from './modules';

function App() {
   const myTheme = ColorModeToggler();
   const {
      taskManaging,
      taskEditing,
      boardManaging,
      deletingBoard,
      deletingTask,
   } = useAppSelector((state) => state.modals);

   return (
      <ThemeProvider theme={myTheme.theme}>
         <ColorModeContext.Provider value={myTheme.colorMode}>
            <CssBaseline />
            <Layout>
               <Main />
            </Layout>

            {taskManaging && <TaskManage />}
            {taskEditing && <AddEditTaskModal />}
            {boardManaging && <BoardManagerModal />}
            {(deletingBoard || deletingTask) && <DeleteModal />}
         </ColorModeContext.Provider>
      </ThemeProvider>
   );
}

export default App;
