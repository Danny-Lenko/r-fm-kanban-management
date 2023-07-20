import { styled, Theme } from '@mui/system';
import { Button, ButtonProps } from '@mui/material';

type ButtonSize = 'small' | 'big' | undefined;
type Colors =
   | 'inherit'
   | 'primary'
   | 'secondary'
   | 'error'
   | 'info'
   | 'success'
   | 'warning'
   | undefined;

interface Props extends ButtonProps {
   buttonsize: ButtonSize;
}

export const StyledBtn = styled(Button)<Props>(
   ({ theme, buttonsize, ...rest }) => ({
      textTransform: 'capitalize',
      fontWeight: 700,
      color:
         rest.color === 'secondary'
            ? theme.palette.primaryCustom.main
            : theme.palette.common.white,
      backgroundColor: setBcgColor(rest.color, theme),
      '&:hover': {
         backgroundColor: setBcgHover(rest.color, theme),
      },

      ...setButtonSize(buttonsize),
   }),
);

// Utility funcs

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

function setButtonSize(size: ButtonSize) {
   return size === 'small'
      ? {
           fontSize: 13 / 16 + 'rem',
           paddingTop: '8.65px',
           paddingBottom: '8.65px',
           borderRadius: '20px',
        }
      : {
           fontSize: 15 / 16 + 'rem',
           paddingTop: '10.88px',
           paddingBottom: '10.88px',
           borderRadius: '24px',
        };
}
