export const usualBoardStyles = (theme: any, drawerOpen: any) => ({
   // height: {
   //    xs: 'calc(100vh - 72px - 24px)',
   //    sm: 'calc(100vh - 72px - 24px)',
   //    md: 'calc(100vh - 72px - 24px)',
   // },

   '& .cols-stack': {
      overflowY: 'auto',
      // overflowX: 'auto',
      // maxWidth: {
      //    xs: '100vw',
      //    sm: drawerOpen ? '70vw' : '100vw',
      //    md: drawerOpen ? '45vw' : '70vw',
      //    lg: drawerOpen ? '55vw' : '84vw',
      // },
      // maxWidth: '100vw',
      // width: '100%',
      pr: 1,
      pb: 5,
      '& .MuiTypography-h5': {
         textTransform: 'uppercase',
      },
      '& .color': {
         width: '15px',
         borderRadius: '50%',
      },
   },
   '& .rows-stack': {
      minWidth: '280px',
      maxWidth: '280px',
   },
   '& .add-col-btn': {
      borderRadius: '8px',
      textTransform: 'capitalize',
      width: '280px',
      marginBottom: '16px',
      backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
      '& .MuiTypography-root': {
         color: 'greyCustom.200',
      },
   },
});
