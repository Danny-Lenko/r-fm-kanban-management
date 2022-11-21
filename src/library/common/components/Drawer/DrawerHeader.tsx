import { styled } from '@mui/material/styles';

// mui docs: Persistent Drawer
const DrawerHeaderEl = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   // necessary for content to be Elbelow app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
}))

const drawerHeaderStyles = {
   minHeight: { xs: '66px', sm: '82px', md: '98px'}
}

// represents gap between viewport top and main
const DrawerHeader = (props:any) => {
   return (  
      <DrawerHeaderEl sx={drawerHeaderStyles}>{props.children}</DrawerHeaderEl>
   );
}

export default DrawerHeader;