import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../hooks';
// import { assembleCustomBtnStyles } from './assembleCustomBtnStyles';
import { CustomizedBtn } from './assembleCustomBtnStyles';

import { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
   sizeSm: boolean;
   text: string;
   onclick?: any;
   styles?: Record<string, string | number> | null | React.CSSProperties;
   icon?: any;
   iconStyles?: Record<string, string>;
   type?: 'button' | 'submit' | 'reset' | undefined;
   isAction?: boolean;
   disabled?: boolean;
   classname?: string;
}

export const CustomBtn: React.FC<Props> = ({
   sizeSm,
   text,
   onclick,
   styles,
   icon,
   iconStyles,
   type,
   isAction,
   disabled,
   classname,
}) => {
   const dispatch = useAppDispatch();
   const theme = useTheme();

   return (
      <CustomizedBtn
         // sizeSm={sizeSm}
         className={classname}
         disableElevation
         variant='contained'
         disabled={disabled}
         // styles={styles}
         // sx={assembleCustomBtnStyles(styles, sizeSm, color, theme)}
         onClick={
            typeof onclick === 'object' || isAction
               ? () => dispatch(onclick('open'))
               : type === 'submit'
               ? () => null
               : () => onclick()
         }
         type={type}
      >
         {text}
         {icon && <SvgIcon sx={iconStyles} component={icon} />}
      </CustomizedBtn>
   );
};

export default CustomBtn;
