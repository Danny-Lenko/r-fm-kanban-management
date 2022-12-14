import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as IconBoard } from '../../../../../resources/assets/icon-board.svg'
import { useAppSelector } from '../../../hooks/hooks';

const DrawerBoardBtn = ({props}:{props:any}) => {
   const { board, btnClick, btnText } = props
   const activeBoard = useAppSelector(state => state.data.activeBoard)

   return (
      <ListItem disablePadding>
         <ListItemButton
            onClick={btnClick}
            className={activeBoard.path === board.path ? 'Mui-active' : ''}
         >
            <ListItemIcon>
               <SvgIcon component={IconBoard} />
            </ListItemIcon>
            <ListItemText primary={btnText} />
         </ListItemButton>
      </ListItem>
   );
}

export default DrawerBoardBtn;