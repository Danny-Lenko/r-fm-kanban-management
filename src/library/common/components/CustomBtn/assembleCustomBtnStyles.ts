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

export const CustomizedBtn = styled(Button)<Props>(
   ({ theme, styles }) => ({
      textTransform: 'capitalize',
      fontWeight: 700,
      borderRadius: 24,
   }),
);

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
//                ? 'primaryCustom.light'
//                : color === 'secondary' && theme.palette.mode === 'light'
//                ? 'secondaryCustom.main'
//                : color === 'secondary' && theme.palette.mode === 'dark'
//                ? 'common.white'
//                : 'destructCustom.light',
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
