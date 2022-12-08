export const assembleManageTaskModalStyles = (theme:any) => ({
   zIndex: 11000,
   p: { xs: 3, sm: 4 },
   borderRadius: '8px',
   width: { sm: '480px' },
   my: 5,
   '& .heading': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      mb: 3,
      '& .MuiTypography-h3': {
         color: theme.palette.text.primary
      },
   },
   '& .MuiTypography-body1': {
      color: 'greyCustom.200',
      mb: 3
   },
   '& .subtasks-heading': {
      color: theme.palette.mode === 'light' ? 'greyCustom.200' : 'common.white',
      mb: 2
   },
   '& .MuiOutlinedInput-root': {
      fontSize: 13/16 + 'rem',
      'input': {
         py: 1.35
      }
   }
})

