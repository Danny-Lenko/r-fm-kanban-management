import SvgIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles';
import { ReactComponent as LightModeIcon } from '../../../../../resources/assets/icon-light-theme.svg'
import { ReactComponent as DarkModeIcon } from '../../../../../resources/assets/icon-dark-theme.svg'
import { useContext } from 'react';
import { ColorModeContext } from '../../../../utilities/ColorModeToggler';
import { drawerModeBtnStyles } from './drawerModeBtnStyles';
import { useTheme } from '@mui/material/styles';

const Android12Switch = styled(Switch)(({ theme }) => ({
   padding: 8,
   marginRight: '5px',
   '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      backgroundColor: '#635FC7',
      opacity: 1,
      '&:before, &:after': {
         content: '""',
         position: 'absolute',
         top: '50%',
         transform: 'translateY(-50%)',
         width: 16,
         height: 16,
      }
   },
   '& .Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#635FC7 !important',
      opacity: '1 !important'
   },
   '& .MuiSwitch-thumb': {
      backgroundColor: '#fff',
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
   },
}));

const DrawerModeBtn = () => {
   const colorMode = useContext(ColorModeContext);
   const theme = useTheme()

   return (
      <Box
         sx={drawerModeBtnStyles(theme)}
      >
         <SvgIcon component={LightModeIcon} />
         <Android12Switch onClick={colorMode.toggleClrMode} />
         <SvgIcon component={DarkModeIcon} />
      </Box>
   );
}

export default DrawerModeBtn;