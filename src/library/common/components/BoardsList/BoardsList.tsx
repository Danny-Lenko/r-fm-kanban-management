import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import DrawerBoardBtn from "../Drawer/DrawerBoardBtn/DrawerBoardBtn";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { openBoardManager } from "../../../../main/slices/modalElsSlice";
import { assignActiveBoard } from "../../../../main/slices/dataSlice";

const BoardsList = () => {
   const boards = useAppSelector(state => state.data.boards)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleOldBoardClick = (board: any) => {
      dispatch(assignActiveBoard(board.id))
      navigate(`${board.path}`)
   }

   const handleCreateBoardClick = () => {
      dispatch(openBoardManager('open'))
   }

   return (
      <>
         <Typography variant='h5' textTransform='uppercase' mt={2}>all boards ({boards.length})</Typography>
         <List>
            <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
               {boards.map(board => (
                  <DrawerBoardBtn
                     key={board.id}
                     props={{
                        board: board,
                        btnClick: () => handleOldBoardClick(board),
                        btnText: board.name
                     }}
                  />
               ))}
            </Box>
            <DrawerBoardBtn
               props={{
                  board: null,
                  btnClick: () => handleCreateBoardClick(),
                  btnText: '+ Create New Board'
               }}
            />
         </List>
      </>
   );
}

export default BoardsList;