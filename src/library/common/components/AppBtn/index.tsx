import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../hooks';
// import { assembleCustomBtnStyles } from './assembleCustomBtnStyles';
import { StyledBtn } from './styledBtn';

import { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
   sizeSm: boolean;
   onclick?: any;
   styles?: Record<string, string | number> | React.CSSProperties;
   icon?: any;
   iconStyles?: Record<string, string>;
   type?: 'button' | 'submit' | 'reset' | undefined;
   isAction?: boolean;
   classname?: string;
}

export const AppBtn: React.FC<Props> = ({
   children,
   color,
   sizeSm,
   onclick,
   styles,
   icon,
   iconStyles,
   type,
   isAction,
   classname,
}) => {
   const dispatch = useAppDispatch();
   const theme = useTheme();

   return (
      <StyledBtn
         // sizeSm={sizeSm}
         color={color}
         className={classname}
         disableElevation
         variant='contained'
         styles={styles}
         onClick={
            typeof onclick === 'object' || isAction
               ? () => dispatch(onclick('open'))
               : type === 'submit'
               ? () => null
               : () => onclick()
         }
         type={type}
      >
         {children}
         {icon && <SvgIcon sx={iconStyles} component={icon} />}
      </StyledBtn>
   );
};
