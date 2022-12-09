import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon'
import { ICustomBtn } from "../../../interfaces/interfaces";
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from "../../hooks/hooks";
import { assembleCustomBtnStyles } from "./assembleCustomBtnStyles";

const CustomBtn = ({
   sizeSm, 
   color, 
   text, 
   onclick, 
   styles, 
   icon, 
   iconStyles,
   type,
   isAction
}: ICustomBtn) => {

   const dispatch = useAppDispatch()
   const theme = useTheme()

   return (  
      <Button
         disableElevation
         variant="contained"
         sx={assembleCustomBtnStyles( styles, sizeSm, color, theme)}
         onClick={
            (typeof onclick === 'object' || isAction) ? () => dispatch( onclick('open') ) 
            : type === 'submit' ? () => null
            : () => onclick()
         }
         type={type}
      >
         {text}
         {
            icon && <SvgIcon sx={iconStyles} component={icon} />
         }
      </Button>
   );
}
 
export default CustomBtn;