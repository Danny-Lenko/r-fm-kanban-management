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
import logoLight from '../../../../resources/assets/logo-light.svg'
import DrawerModeBtn from './DrawerModeBtn';
import useTheme from '@mui/material/styles/useTheme';

export default function PersistentDrawerLeft() {
  const open = useAppSelector(state => state.drawer.open)
  const theme = useTheme()

  const drawerStyles = {
    position: 'relative',
    width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
      boxSizing: 'border-box',
    },
    '& .mode-btn': {
      position: 'absolute',
      bottom: '12%',
      minHeight: '48px',
      width: '85%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '6px',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: '0.1rem',
      '& .MuiSvgIcon-root': {
        transform: 'translateY(12%)'
      }
    },
    '& .blind-btn': {
      position: 'absolute',
      left: -20,
      bottom: '5%',
      mx: '11px',
      pl: 3,
      pr: 2,
      justifyContent: 'flex-start',
      textTransform: 'capitalize',
      color: 'greyCustom.200',
      fontSize: 15/16 + 'rem',
      '& .MuiSvgIcon-root': {
        transform: 'translateY(20%)',
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
          src={theme.palette.mode === 'light' ? logoDark : logoLight}
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

      <DrawerModeBtn />
      <DrawerBlindBtn />
    </Drawer>
  );
}