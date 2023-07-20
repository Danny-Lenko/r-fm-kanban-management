import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
// import DrawerBoardBtn from '../DrawerBoardBtn';

import { DrawerBoardBtn } from '..';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import {
   setBoardManaging,
   setXsBoardsOpen,
} from '../../../../main/slices/modalSlice';
import { assignActiveBoard } from '../../../../main/slices/dataSlice';
import { boardsListStyles } from './boardsListStyles';
import useTheme from '@mui/material/styles/useTheme';

const BoardsList = () => {
   const boards = useAppSelector((state) => state.data.boards);
   const xsBoardsOpen = useAppSelector((state) => state.modals.xsBoardsOpen);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const theme = useTheme();

   const handleOldBoardClick = (board: any) => {
      dispatch(assignActiveBoard(board.id));
      navigate(`${board.path}`);
   };

   const handleCreateBoardClick = () => {
      dispatch(setBoardManaging(true));
      dispatch(setXsBoardsOpen(false));
   };

   return (
      <Box sx={boardsListStyles(theme)}>
         <Typography
            variant='h5'
            textTransform='uppercase'
            px={xsBoardsOpen ? 3 : 0}
            py={xsBoardsOpen ? 1 : 0}
            mt={2}
         >
            all boards ({boards.length})
         </Typography>
         <List>
            <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
               {boards.map((board) => (
                  <DrawerBoardBtn
                     key={board.id}
                     props={{
                        board: board,
                        btnClick: () => handleOldBoardClick(board),
                        btnText: board.name,
                     }}
                  />
               ))}
            </Box>
            <DrawerBoardBtn
               props={{
                  board: null,
                  btnClick: () => handleCreateBoardClick(),
                  btnText: '+ Create New Board',
               }}
            />
         </List>
      </Box>
   );
};

export default BoardsList;
