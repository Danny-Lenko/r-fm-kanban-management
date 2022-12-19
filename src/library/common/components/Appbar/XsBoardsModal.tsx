import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setXsBoardsOpen } from '../../../../main/slices/modalElsSlice';

// Modal from MUI docs
const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  minWidth: '315px',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const XsBoardsModal = () => {
  const open = useAppSelector(state => state.modals.xsBoardsOpen)
  const dispatch = useAppDispatch()

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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

export default XsBoardsModal;