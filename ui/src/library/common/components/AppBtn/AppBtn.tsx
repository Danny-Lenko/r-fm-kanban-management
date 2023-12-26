import React from 'react';

import SvgIcon from '@mui/material/SvgIcon';
import { ButtonProps } from '@mui/material';

import { CssAppBtn } from '.';

export interface Props extends ButtonProps {
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
   const props = {
      disableElevation: true,
      variant: 'contained' as 'contained',
      buttonsize: buttonSize,
      color: 'primary' as 'primary',

      children: (
         <>
            {children}
            {icon && <SvgIcon sx={iconStyles} component={icon} />}
         </>
      ),
   };

   return <CssAppBtn {...props} {...rest} />;
};
