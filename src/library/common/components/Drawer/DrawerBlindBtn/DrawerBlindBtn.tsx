import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as BlindIcon } from '../../../../../resources/assets/icon-hide-sidebar.svg'
import { useAppDispatch } from "../../../hooks/hooks";
import { closeDrawer } from "../../../../../main/slices/drawerSlice";

const DrawerBlindBtn = () => {
   const dispatch = useAppDispatch()

   return (
      <Button
         className='blind-btn'
         variant="text"
         onClick={() => dispatch(closeDrawer('close'))}
      >
         <SvgIcon component={BlindIcon} />
         Hide Sidebar
      </Button>
   );
}

export default DrawerBlindBtn;