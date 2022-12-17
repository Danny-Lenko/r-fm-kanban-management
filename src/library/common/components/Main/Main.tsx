import { useAppSelector } from "../../hooks/hooks";
import DrawerHeader from "../Drawer/DrawerHeader/DrawerHeader";
import MainEl from "./MainEl";
import CustomBtn from "../CustomBtn/CustomBtn";
import { ReactComponent as eyeIcon } from '../../../../resources/assets/icon-show-sidebar.svg'
import { openDrawer } from "../../../../main/slices/drawerSlice";
import { Routes, Route } from 'react-router-dom'
import ZeroBoard from "../../../../modules/ZeroBoard/ZeroBoard";
import UsualBoard from "../../../../modules/UsualBoard/UsualBoard";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from '@mui/material/styles/useTheme'
import { mainStyles } from "./mainStyles";

const Main = () => {
   const open = useAppSelector(state => state.drawer.open)
   const { activeBoard, boards } = useAppSelector(state => state.data)
   const theme = useTheme()
   const sxScreen = useMediaQuery(theme.breakpoints.down('sm'))

   return (
      <MainEl open={open} sx={mainStyles}>
         <DrawerHeader />

         <Routes>
            <Route path="/" element={boards[0] && activeBoard.columns.length !== 0 ? <UsualBoard /> : <ZeroBoard />} />
            <Route path=':name' element={activeBoard.columns.length === 0 ? <ZeroBoard /> : <UsualBoard />} />
         </Routes>

         {
            !sxScreen &&
               <CustomBtn
                  classname="eyeBtn"
                  sizeSm={false}
                  color='primary'
                  text=''
                  icon={eyeIcon}
                  onclick={openDrawer}
                  isAction={true}
               />
         }
      </MainEl>
   );
}

export default Main;