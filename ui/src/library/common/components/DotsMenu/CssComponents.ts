import { styled } from '@mui/system';
import { ListItemIcon, MenuItem, MenuItemProps } from '@mui/material';

interface Props extends MenuItemProps {
   option: string;
}

export const CssMenuItem = styled(MenuItem)<Props>(({ theme, option }) => ({
   color: option === 'delete' ? theme.palette.destructCustom.main : 'inherit',
}));

export const CssListIcon = styled(ListItemIcon)(({ theme }) => ({
   '&.MuiListItemIcon-root': {
      minWidth: 'fit-content !important',
      fontSize: '10px',
   },
}));
