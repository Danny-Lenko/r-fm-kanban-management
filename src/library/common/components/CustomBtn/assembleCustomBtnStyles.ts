import { BTNWIDTH } from '../../constants';

export const assembleCustomBtnStyles = (
   styles: any,
   sizeSm: boolean,
   color: string,
   theme: any,
) => ({
   textTransform: 'capitalize',
   fontWeight: 700,
   fontSize: sizeSm ? 13 / 16 + 'rem' : 15 / 16 + 'rem',
   width: BTNWIDTH,
   py: sizeSm ? '8.65px' : '10.88px',
   borderRadius: sizeSm ? '20px' : '24px',
   color: color === 'secondary' ? 'primaryCustom.main' : 'common.white',
   backgroundColor:
      color === 'primary'
         ? 'primaryCustom.main'
         : color === 'secondary' && theme.palette.mode === 'light'
         ? 'secondaryCustom.light'
         : color === 'secondary' && theme.palette.mode === 'dark'
         ? 'common.white'
         : 'destructCustom.main',
   '&:hover': {
      backgroundColor:
         color === 'primary'
            ? 'primaryCustom.light'
            : color === 'secondary' && theme.palette.mode === 'light'
            ? 'secondaryCustom.main'
            : color === 'secondary' && theme.palette.mode === 'dark'
            ? 'common.white'
            : 'destructCustom.light',
   },
   ...styles,
});
