export const assembleManageTaskModalStyles = (theme:any) => ({
   zIndex: 11000,
   p: { xs: 3, sm: 4 },
   borderRadius: '8px',
   width: { xs: '95%', sm: '480px' },
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
   }
})

export const assembleCheckboxStyles = (subtask:any, theme:any) => ({
   backgroundColor: theme.palette.background.default,
   m: 0,
   mt: 1,
   borderRadius: 1,
   '&:hover': {
      backgroundColor: 'rgba(99, 95, 199, 0.25)'
   },
   '& .MuiCheckbox-root': {
      '& .MuiSvgIcon-root': {
         fontSize: '16px',
         color: theme.palette.divider,
         backgroundColor: theme.palette.background.paper,
         '& path': {
            transform: "translate(-4px, -4px) scale(1.35)",
         }
      },
      '&.Mui-checked': {
         '& .MuiSvgIcon-root': {
            color: 'primary.main'
         },
         '& ~ .MuiFormControlLabel-label': {
            textDecoration: 'line-through'
         }
      }
   },
   '& .MuiTypography-root': {
      py: 1,
      mb: 0,
      fontSize: 12 / 16 + 'rem',
      fontWeight: 700,
      color: !subtask.isCompleted ? theme.palette.text.primary : 'greyCustom.200',
   }
})