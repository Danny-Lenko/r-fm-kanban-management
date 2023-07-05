import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomBtn from '../../library/common/components/CustomBtn/CustomBtn';
import { setBoards, assignActiveBoard } from '../../main/slices/dataSlice';
import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { COLUMNCOLORS } from '../../library/common/constants';

const ZeroBoard = () => {
   const { boards, activeBoardId } = useAppSelector((state) => state.data);
   const dispatch = useAppDispatch();

   function addCol() {
      const boardsUpdated = boards.map((board) =>
         board.id !== activeBoardId
            ? board
            : {
                 ...board,
                 columns: [
                    {
                       id: 0,
                       color: COLUMNCOLORS[0],
                       name: 'NEWCOLUMN1',
                       tasks: [],
                    },
                 ],
              },
      );
      dispatch(setBoards(boardsUpdated));
      dispatch(assignActiveBoard(activeBoardId));
   }

   return (
      <Box
         sx={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Typography
            sx={{
               fontSize: '18px',
               color: '#828FA3',
               fontWeight: 700,
               mb: 4,
               textAlign: 'center',
            }}
         >
            This board is empty. Create a new column to get started.
         </Typography>
         <CustomBtn
            sizeSm={false}
            color='primary'
            text='+ Add New Column'
            styles={{ width: 'fit-content', px: 2 }}
            onclick={addCol}
         />
      </Box>
   );
};

export default ZeroBoard;
