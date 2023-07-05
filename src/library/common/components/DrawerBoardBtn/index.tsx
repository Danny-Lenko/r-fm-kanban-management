import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as IconBoard } from '../../../../resources/assets/icon-board.svg';
import { useAppSelector } from '../../hooks';

export const DrawerBoardBtn = ({ props }: { props: any }) => {
   const { board, btnClick, btnText } = props;
   const activeBoard = useAppSelector((state) => state.data.activeBoard);

   return (
      <ListItem disablePadding>
         <ListItemButton
            onClick={btnClick}
            className={
               board && activeBoard.path === board.path ? 'Mui-active' : ''
            }
         >
            <ListItemIcon>
               <SvgIcon
                  sx={{
                     color: board ? 'greyCustom.200' : 'primaryCustom.main',
                  }}
                  component={IconBoard}
               />
            </ListItemIcon>
            <ListItemText
               sx={{ color: board ? 'greyCustom.200' : 'primaryCustom.main' }}
               primary={btnText}
            />
         </ListItemButton>
      </ListItem>
   );
};
