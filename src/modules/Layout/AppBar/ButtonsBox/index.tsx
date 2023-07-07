import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DotsMenu from '../../../../library/common/components/DotsMenu/DotsMenu';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
   useAppSelector,
   useAppDispatch,
} from '../../../../library/common/hooks';
import { setTaskEditing } from '../../../../main/slices/modalElsSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { buttonsBoxStyles, sxPlusBtnStyles } from './buttonsBoxStyles';

import { AppBtn } from '../../../../library/common/components';

const ButtonsBox = () => {
   const activeBoard = useAppSelector((state) => state.data.activeBoard);
   const dispatch = useAppDispatch();
   const theme = useTheme();
   const xsScreen = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box sx={buttonsBoxStyles}>
         {xsScreen ? (
            <IconButton
               disabled={!activeBoard.columns[0]}
               sx={sxPlusBtnStyles}
               onClick={() => dispatch(setTaskEditing(true))}
            >
               <AddRoundedIcon />
            </IconButton>
         ) : (
            <AppBtn
               disabled={!activeBoard.columns[0]}
               buttonSize='small'
               color='primary'
               onClick={() => dispatch(setTaskEditing(true))}
            >
               + Add New Task
            </AppBtn>
         )}

         <DotsMenu isTaskMenu={false} />
      </Box>
   );
};

export default ButtonsBox;
