export const boardsListStyles = (theme:any) => ({
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
         transform: 'translateY(20%) translateX(25%)',
      },
      '& .MuiTypography-root': {
         fontSize: 15/16 + 'rem',
         fontWeight: 700,
      }
   }
})