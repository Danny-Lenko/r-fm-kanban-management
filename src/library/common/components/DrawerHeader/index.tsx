import { styled } from '@mui/material/styles';

// mui docs: Persistent Drawer
const DrawerHeaderEl = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   // necessary for content to be Elbelow app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-start',
}))

const drawerHeaderStyles = {
   minHeight: { xs: '66px', sm: '82px', md: '98px'}
}

// represents gap between viewport top and main
export const DrawerHeader = (props:any) => {
   return (  
      <DrawerHeaderEl sx={drawerHeaderStyles}>{props.children}</DrawerHeaderEl>
   );
}
