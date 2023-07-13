import SvgIcon from '@mui/material/SvgIcon';
import { ButtonProps } from '@mui/material';
import { StyledBtn } from './styledBtn';
import React from 'react';

interface Props extends ButtonProps {
   children?: React.ReactNode;
   icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
   iconStyles?: React.CSSProperties;
   buttonSize?: 'small' | 'big';
   sx?: React.CSSProperties;
}

export const AppBtn: React.FC<Props> = ({
   children,
   icon,
   iconStyles,
   buttonSize,
   ...rest
}) => {
   return (
      <StyledBtn
         disableElevation
         variant='contained'
         buttonsize={buttonSize}
         {...rest}
      >
         {children}
         {icon && <SvgIcon sx={iconStyles} component={icon} />}
      </StyledBtn>
   );
};
