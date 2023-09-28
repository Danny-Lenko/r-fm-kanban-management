import { useContext } from 'react';
import { SvgIcon } from '@mui/material';

import { ColorModeContext } from '../../../../App';
import { Android12Switch, CssWrapper } from '.';

import { ReactComponent as LightModeIcon } from '../../../../resources/assets/icon-light-theme.svg';
import { ReactComponent as DarkModeIcon } from '../../../../resources/assets/icon-dark-theme.svg';

export const ColorModeButton = () => {
   const colorMode = useContext(ColorModeContext);

   return (
      <CssWrapper>
         <SvgIcon component={LightModeIcon} />
         <Android12Switch onClick={colorMode.toggleClrMode} />
         <SvgIcon component={DarkModeIcon} />
      </CssWrapper>
   );
};
