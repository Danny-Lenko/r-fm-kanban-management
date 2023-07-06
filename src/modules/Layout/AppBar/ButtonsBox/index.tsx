import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CustomBtn from '../../../../library/common/components/AppBtn';
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
            <CustomBtn
               disabled={!activeBoard.columns[0]}
               sizeSm={false}
               color='primary'
               text='+ Add New Task'
               onclick={() => dispatch(setTaskEditing(true))}
            />
         )}

         <DotsMenu isTaskMenu={false} />
      </Box>
   );
};

export default ButtonsBox;
