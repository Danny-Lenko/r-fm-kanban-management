import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { setXsBoardsOpen } from '../../../../../main/slices/modalElsSlice';
import BoardsList from '../../BoardsList/BoardsList';
import DrawerModeBtn from '../../Drawer/DrawerModeBtn/DrawerModeBtn';

const XsBoardsModal = () => {
  const open = useAppSelector(state => state.modals.xsBoardsOpen)
  const boards = useAppSelector(state => state.data.boards)
  const dispatch = useAppDispatch()

  const style = {
    position: 'absolute' as 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translate(-50%, -0%)',
    minWidth: '315px',
    width: '80%',
    maxWidth: '380px',
    bgcolor: 'background.paper',
    height: boards.length * 10 + 20 + 'vh',
    maxHeight: '75vh',
    boxShadow: 24,
    borderRadius: '8px',
  };

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setXsBoardsOpen(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: { marginTop: '65px' }
        },
      }}
    >
      <Box sx={style}>
        <BoardsList />
        <Box sx={{ position: 'absolute', bottom: 10, width: '100%' }}>
          <DrawerModeBtn />
        </Box>
      </Box>
    </Modal>
  );
}

export default XsBoardsModal;