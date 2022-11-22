import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../hooks/hooks';
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from '../../constants/constants';
import DrawerHeader from './DrawerHeader';
import DrawerBlindBtn from './DrawerBlindBtn';
import logoDark from '../../../../resources/assets/logo-dark.svg'

export default function PersistentDrawerLeft() {
  const open = useAppSelector(state => state.drawer.open)

  const drawerStyles = {
    position: 'relative',
    width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
      boxSizing: 'border-box',
    },
    '& .blind-btn': {
      position: 'absolute',
      left: -20,
      bottom: '20px',
      mx: '11px',
      pl: 3,
      justifyContent: 'flex-start',
      textTransform: 'capitalize',
      '& .MuiSvgIcon-root': {
        transform: 'translateY(15%)',
        mr: 1
      }
    }
  }

  return (
    <Drawer
      sx={drawerStyles}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          component='img'
          sx={{ width: '153px' }}
          src={logoDark}
          alt='kanban'
        ></Box>
      </DrawerHeader>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <DrawerBlindBtn />
    </Drawer>
  );
}