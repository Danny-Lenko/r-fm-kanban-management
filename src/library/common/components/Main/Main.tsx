import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../hooks/hooks";
import DrawerHeader from "../Drawer/DrawerHeader";
import MainEl from "./MainEl";
import CustomBtn from "../CustomBtn/CustomBtn";
import { ReactComponent as eyeIcon } from '../../../../resources/assets/icon-show-sidebar.svg'

const Main = () => {
   const open = useAppSelector(state => state.drawer.open)

   const eyeBtnStyles = {
      width: '80px',
      pr: 2,
      pl: 5,
      position: 'absolute',
      bottom: '20px',
      left: -25,
      minHeight: '40px'
   }

   const eyeIconStyles = {
      transform: 'translateY(25%)'
   }

   return (
      <MainEl open={open}>
         <DrawerHeader />

         <CustomBtn sizeSm={false} color='primary' text='' />

         <CustomBtn
            sizeSm={false}
            color='primary'
            text=''
            icon={eyeIcon}
            styles={eyeBtnStyles}
            iconStyles={eyeIconStyles}
         />
      </MainEl>
   );
}

export default Main;