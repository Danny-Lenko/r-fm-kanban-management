import { useAppSelector } from "../../hooks/hooks";
import DrawerHeader from "../Drawer/DrawerHeader";
import MainEl from "./MainEl";
import CustomBtn from "../CustomBtn/CustomBtn";
import { ReactComponent as eyeIcon } from '../../../../resources/assets/icon-show-sidebar.svg'
import { openDrawer } from "../../../../main/slices/drawerSlice";
import { Routes, Route } from 'react-router-dom'
import ZeroBoard from "../../../../modules/ZeroBoard/ZeroBoard";
import UsualBoard from "../../../../modules/UsualBoard/UsualBoard";

const Main = () => {
   const open = useAppSelector(state => state.drawer.open)
   const boards = useAppSelector(state => state.data.boards)

   const eyeBtnStyles = {
      width: '80px',
      pr: 2,
      pl: 5,
      position: 'absolute',
      bottom: '5%',
      left: -25,
      minHeight: '40px'
   }

   const eyeIconStyles = {
      transform: 'translateY(25%)'
   }

   return (
      <MainEl open={open}>
         <DrawerHeader />

         <Routes>
            <Route path="/" element={boards[0] ? <UsualBoard /> : <ZeroBoard />}>
               <Route path=':name' element={<UsualBoard />} />
            </Route>
         </Routes>

         <CustomBtn
            sizeSm={false}
            color='primary'
            text=''
            icon={eyeIcon}
            styles={eyeBtnStyles}
            iconStyles={eyeIconStyles}
            onclick={openDrawer}
         />
      </MainEl>
   );
}

export default Main;