export const boardManagerStyles = (theme: any) => ({
   zIndex: 11000,
   p: { xs: 3, sm: 4 },
   borderRadius: '8px',
   width: { xs: '95%', sm: '480px' },
   my: 5,
   '& .MuiTypography-h3': {
      color: theme.palette.text.primary
   },
   '& .MuiTypography-body1': {
      color: 'greyCustom.200',
      mb: 3
   },
   '& .subtasks-heading': {
      color: theme.palette.mode === 'light' ? 'greyCustom.200' : 'common.white',
      mb: 2
   },
   '& .MuiTextField-root': {
      position: 'relative'
   },
   '& .MuiOutlinedInput-root': {
      fontSize: 13 / 16 + 'rem',
      'input': {
         py: 1.3
      },
      '& .MuiOutlinedInput-notchedOutline': { 
         borderColor: theme.palette.divider 
      }
   },
   '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: 0,
      my: 0
   },
   '& .subtasks-list': {
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
   },
   '& .subtask-container': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      gap: 2
   }
})

