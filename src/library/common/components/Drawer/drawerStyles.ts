import { Theme } from "@mui/system"
import { DRAWERWIDTHSM, DRAWERWIDTHMD } from '../../constants/constants';

const assembleDrawerStyles = (theme: Theme) => ({
   position: 'relative',
   width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
   flexShrink: 0,
   '& .MuiDrawer-paper': {
      width: { xs: 0, sm: DRAWERWIDTHSM, md: DRAWERWIDTHMD },
      boxSizing: 'border-box',
      px: {xs: 0, sm: 3},
   },
   '& .MuiList-root': {
      position: 'absolute',
      top: {sm: '18%', md: '21%'},
      width: '95%',
      left: 0
   },
   // list btns
   '& .MuiListItemButton-root': {
      borderTopRightRadius: '24px',
      borderBottomRightRadius: '24px',
      '&:hover': {
         backgroundColor: theme.palette.background.default
      },
      '&.Mui-active': {
         backgroundColor: 'primaryCustom.main',
         '& .MuiTypography-root': {
            color: 'common.white'
         },
         '& .MuiSvgIcon-root': {
            color: 'common.white'
         }
      },
      '& .MuiListItemIcon-root': {
         minWidth: '25px',
         mr: 2
      },
      '& .MuiSvgIcon-root': {
         color: 'greyCustom.200',
         transform: 'translateY(20%) translateX(25%)',
      },
      '& .MuiTypography-root': {
         fontSize: 15/16 + 'rem',
         fontWeight: 700,
         color: 'greyCustom.200'
      }
   },
   // mode btn
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
   // blind btn
   '& .blind-btn': {
      position: 'absolute',
      left: -10,
      bottom: '5%',
      mx: '11px',
      pl: 3,
      pr: 2,
      justifyContent: 'flex-start',
      textTransform: 'capitalize',
      color: 'greyCustom.200',
      fontSize: 15 / 16 + 'rem',
      '& .MuiSvgIcon-root': {
         transform: 'translateY(20%)',
         mr: 1
      }
   }
})

export default assembleDrawerStyles
