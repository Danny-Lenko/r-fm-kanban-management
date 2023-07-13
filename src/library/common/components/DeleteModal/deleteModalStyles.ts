import { Theme } from "@mui/system"

export const deleteModalStyles = (theme: Theme) => ({
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

export const deleteBtnSx = (theme: Theme) =>({
   backgroundColor: theme.palette.destructCustom.main,
})

