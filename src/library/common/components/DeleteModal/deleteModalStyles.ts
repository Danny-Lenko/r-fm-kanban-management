export const deleteModalStyles = (theme: any) => ({
   zIndex: 11000,
   p: { xs: 3, sm: 4 },
   borderRadius: '8px',
   width: { xs: '300px', sm: '480px' },
   my: 5,
   '& .MuiTypography-h3': {
      color: theme.palette.text.primary
   },
   '& .MuiTypography-body1': {
      color: 'greyCustom.200',
      my: 3
   },
})

