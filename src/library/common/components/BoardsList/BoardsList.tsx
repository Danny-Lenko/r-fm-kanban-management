import { useNavigate } from 'react-router-dom';
import { List } from '@mui/material';

import {
   setBoardEditing,
   setXsBoardsOpen,
} from '../../../../main/store/modals/modalSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setActiveBoardId } from '../../../../main/store/data/dataSlice';

import { CssBtnBox, CssBoardsLabel, BoardBtn } from '.';

export const BoardsList = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { boards } = useAppSelector((state) => state.data);
   const { xsBoardsOpen } = useAppSelector((state) => state.modals);

   const handleBoardSwitch = ({ id, path }: { id: string; path: string }) => {
      dispatch(setActiveBoardId(id));
      navigate(`${path}`);
   };

   const handleCreateBoardClick = () => {
      dispatch(setBoardEditing(true));
      dispatch(setXsBoardsOpen(false));
   };

   const label = !xsBoardsOpen ? 'drawer' : '';

   return (
      <>
         <CssBoardsLabel variant='h5' aria-label={label}>
            all boards ({boards.length})
         </CssBoardsLabel>

         <CssBtnBox>
            <List>
               {boards.map((board) => {
                  const { path, name, id } = board;
                  return (
                     <BoardBtn
                        key={id}
                        props={{
                           path,
                           btnClick: () => handleBoardSwitch({ id, path }),
                           name,
                        }}
                     />
                  );
               })}
            </List>

            <BoardBtn
               props={{
                  path: null,
                  btnClick: () => handleCreateBoardClick(),
                  name: '+ Create New Board',
               }}
            />
         </CssBtnBox>
      </>
   );
};
