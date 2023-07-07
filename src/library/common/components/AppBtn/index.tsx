import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import { ButtonProps } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { StyledBtn } from './styledBtn';


interface Props extends ButtonProps {
   // onclick?: any;
   buttonSize?: 'small' | 'big';
   styles?: Record<string, string | number> | React.CSSProperties;
   icon?: any;
   iconStyles?: Record<string, string>;
   type?: 'button' | 'submit' | 'reset' | undefined;
   isAction?: boolean;
   classname?: string;
}

export const AppBtn: React.FC<Props> = ({
   onClick,
   // onclick,
   children,
   color,
   buttonSize,
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
         buttonSize={buttonSize}
         color={color}  
         className={classname}
         disableElevation
         variant='contained'
         styles={styles}
         onClick={onClick}
         type={type}
         // onClick={
         //    typeof onclick === 'object' || isAction
         //       ? () => dispatch(onclick('open'))
         //       : type === 'submit'
         //       ? () => null
         //       : () => onclick()
         // }
      >
         {children}
         {icon && <SvgIcon sx={iconStyles} component={icon} />}
      </StyledBtn>
   );
};
