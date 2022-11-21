import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon'
import { ICustomBtn } from "../../../interfaces/interfaces";
import { BTNWIDTH } from "../../constants/constants";
import { useTheme } from '@mui/material/styles';

// import { ReactComponent as ShowDrawerIcon } from '../../../../resources/assets/icon-show-sidebar.svg'

const CustomBtn = ({sizeSm, color, text, styles, icon, iconStyles }: ICustomBtn) => {
   const theme = useTheme()

   const customBtnStyles = {
      textTransform: 'capitalize',
      fontWeight: 700,
      fontSize: sizeSm ? 13 / 16 + 'rem' : 15 / 16 + 'rem',
      width: BTNWIDTH,
      py: sizeSm ? '8.65px' : '10.88px',
      borderRadius: sizeSm ? '20px' : '24px',
      color: color === 'secondary' ? 'primaryCustom.main' : 'common.white',
      backgroundColor: color === 'primary' ? 'primaryCustom.main'
         : color === 'secondary' && theme.palette.mode === 'light' ? 'secondaryCustom.light'
         : color === 'secondary' && theme.palette.mode === 'dark' ? 'common.white'
         : 'destructCustom.main',
      '&:hover': {
         backgroundColor: color === 'primary' ? 'primaryCustom.light'
            : color === 'secondary' && theme.palette.mode === 'light' ? 'secondaryCustom.main'
            : color === 'secondary' && theme.palette.mode === 'dark' ? 'secondaryCustom.light'
            : 'destructCustom.light',
      },
      ...styles
   }

   return (  
      <Button
         disableElevation
         variant="contained"
         sx={customBtnStyles}
         // endIcon={<ShowDrawerIcon />}
      >
         {text}
         {
            icon && <SvgIcon sx={iconStyles} component={icon} />
         }
      </Button>
   );
}
 
export default CustomBtn;