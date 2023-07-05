import { Theme } from '@mui/system';
import {
   drawerWidthSm,
   drawerWidthMd,
} from '../../../library/common/constants';

const assembleDrawerStyles = (theme: Theme) => ({
   position: 'relative',
   width: { xs: 0, sm: drawerWidthSm, md: drawerWidthMd },
   flexShrink: 0,
   '& .MuiDrawer-paper': {
      width: { xs: 0, sm: drawerWidthSm, md: drawerWidthMd },
      boxSizing: 'border-box',
      px: { xs: 0, sm: 3 },
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
         mr: 1,
      },
   },
});

export default assembleDrawerStyles;
