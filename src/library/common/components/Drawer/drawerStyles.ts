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
