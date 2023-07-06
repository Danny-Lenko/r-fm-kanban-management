import { BTNWIDTH } from '../../constants';

import { styled, Theme } from '@mui/system';
import { Button, ButtonProps } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface Props extends ButtonProps {
   styles?: React.CSSProperties;
   theme?: Theme;
   icon?: React.ElementType<SvgIconProps>;
   iconStyles?: React.CSSProperties;
   // sizeSm: boolean;
}

export const StyledBtn = styled(Button)<Props>(({ theme, styles, color }) => ({
   textTransform: 'capitalize',
   fontWeight: 700,
   borderRadius: 24,

   backgroundColor: setBcgColor(color, theme),
   '&:hover': {
      backgroundColor: setBcgHover(color, theme),
   },

   ...styles,
}));

type Colors =
   | 'inherit'
   | 'primary'
   | 'secondary'
   | 'error'
   | 'info'
   | 'success'
   | 'warning'
   | undefined;

function setBcgColor(color: Colors, theme: Theme) {
   const bcgColor =
      color === 'primary'
         ? theme.palette.primaryCustom.main
         : color === 'secondary' && theme.palette.mode === 'light'
         ? theme.palette.secondaryCustom.light
         : color === 'secondary' && theme.palette.mode === 'dark'
         ? theme.palette.common.white
         : theme.palette.destructCustom.light;

   return bcgColor;
}

function setBcgHover(color: Colors, theme: Theme) {
   const bcgColor =
      color === 'primary'
         ? theme.palette.primaryCustom.light
         : color === 'secondary' && theme.palette.mode === 'light'
         ? theme.palette.secondaryCustom.main
         : color === 'secondary' && theme.palette.mode === 'dark'
         ? theme.palette.common.white
         : theme.palette.destructCustom.light;

   return bcgColor;
}

// export const CustomizedBtn = styled(Button)<Props>(
//    ({ theme, styles, color}) => ({
//       textTransform: 'capitalize',
//       fontWeight: 700,
//       // fontSize: sizeSm ? 13 / 16 + 'rem' : 15 / 16 + 'rem',
//       // width: BTNWIDTH,
//       // py: sizeSm ? '8.65px' : '10.88px',
//       // borderRadius: sizeSm ? '20px' : '24px',
//       // color: color === 'secondary' ? 'primaryCustom.main' : 'common.white',
//       // backgroundColor:
//       //    color === 'primary'
//       //       ? 'primaryCustom.main'
//       //       : color === 'secondary' && theme.palette.mode === 'light'
//       //       ? 'secondaryCustom.light'
//       //       : color === 'secondary' && theme.palette.mode === 'dark'
//       //       ? 'common.white'
//       //       : 'destructCustom.main',
//       '&:hover': {
//          backgroundColor:
//             color === 'primary'
// ? 'primaryCustom.light'
// : color === 'secondary' && theme.palette.mode === 'light'
// ? 'secondaryCustom.main'
// : color === 'secondary' && theme.palette.mode === 'dark'
// ? 'common.white'
// : 'destructCustom.light',
//       },

//       ...styles,
//    }),
// );

// export const assembleCustomBtnStyles = (
//    styles: any,
//    sizeSm: boolean,
//    color: string,
//    theme: any,
// ) => ({
//    textTransform: 'capitalize',
//    fontWeight: 700,
//    fontSize: sizeSm ? 13 / 16 + 'rem' : 15 / 16 + 'rem',
//    width: BTNWIDTH,
//    py: sizeSm ? '8.65px' : '10.88px',
//    borderRadius: sizeSm ? '20px' : '24px',
//    color: color === 'secondary' ? 'primaryCustom.main' : 'common.white',
//    backgroundColor:
//       color === 'primary'
//          ? 'primaryCustom.main'
//          : color === 'secondary' && theme.palette.mode === 'light'
//          ? 'secondaryCustom.light'
//          : color === 'secondary' && theme.palette.mode === 'dark'
//          ? 'common.white'
//          : 'destructCustom.main',
//    '&:hover': {
//       backgroundColor:
//          color === 'primary'
//             ? 'primaryCustom.light'
//             : color === 'secondary' && theme.palette.mode === 'light'
//             ? 'secondaryCustom.main'
//             : color === 'secondary' && theme.palette.mode === 'dark'
//             ? 'common.white'
//             : 'destructCustom.light',
//    },
//    ...styles,
// });
