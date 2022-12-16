export const usualBoardStyles = (theme:any, drawerOpen:any) => ({
   height: { xs: 'calc(100vh - 95px)', sm: 'calc(100vh - 110px)', md: 'calc(100vh - 130px)' },
   '& .cols-stack': {
      overflowY: 'auto',
      overflowX: 'auto',
      maxWidth: { xs: '100vw', sm: drawerOpen ? '70vw' : '100vw', md: drawerOpen ? '55vw' : '70vw' },
      pr: 1,
      pb: 5,
      '& .MuiTypography-h5': {
         textTransform: 'uppercase'
      }
   },
   '& .rows-stack': {
      minWidth: '280px',
      maxWidth: '280px'
   },
   '& .add-col-btn': {
      borderRadius: '8px',
      textTransform: 'capitalize',
      width: '280px',
      backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
      '& .MuiTypography-root': {
         color: 'greyCustom.200'
      }
   }
})
