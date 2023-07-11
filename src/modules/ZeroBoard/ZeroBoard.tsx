import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setBoards, assignActiveBoard } from '../../main/slices/dataSlice';
import { useAppSelector, useAppDispatch } from '../../library/common/hooks';
import { COLUMNCOLORS } from '../../library/common/constants';

import { AppBtn } from '../../library/common/components';
import { sx } from './zeroBoardStyles';

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
      <Box sx={sx.wrapper}>
         <Typography sx={sx.content}>
            This board is empty. Create a new column to get started.
         </Typography>
         <AppBtn
            buttonSize='small'
            color='primary'
            sx={sx.button}
            onClick={addCol}
         >
            + Add New Column
         </AppBtn>
      </Box>
   );
};

export default ZeroBoard;
