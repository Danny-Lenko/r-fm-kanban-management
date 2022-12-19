export const drawerModeBtnStyles = (theme: any) => ({
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
})