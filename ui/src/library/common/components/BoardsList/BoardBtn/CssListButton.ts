import { ListItemButton } from '@mui/material';
import { styled } from '@mui/system';

export const CssListButton = styled(ListItemButton)(({ theme }) => ({
   borderTopRightRadius: '24px',
   borderBottomRightRadius: '24px',
   color: theme.palette.greyCustom[200],

   '&:hover': {
      backgroundColor: theme.palette.background.default,
   },

   '&[aria-selected=true]': {
      backgroundColor: theme.palette.primaryCustom.main,
      '& .MuiTypography-root': {
         color: theme.palette.common.white,
         margin: 0,
      },
      '& .MuiSvgIcon-root': {
         color: theme.palette.common.white,
      },
   },

   '&[aria-label=create]': {
      '& .MuiTypography-root': {
         color: theme.palette.primaryCustom.main,
      },
      '& .MuiSvgIcon-root': {
         color: theme.palette.primaryCustom.main,
      },
   },

   '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      width: '24px',
   },

   '& .MuiSvgIcon-root': {
      color: theme.palette.greyCustom[200],
      transform: 'translateY(4px)',
   },

   '& .MuiTypography-root': {
      fontSize: 15 / 16 + 'rem',
      fontWeight: 700,
      display: 'inline',
   },
}));
