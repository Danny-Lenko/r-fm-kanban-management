export const buttonsBoxStyles = () => ({
   marginLeft: 'auto',
   display: 'flex',
   alignItems: 'center',
   gap: 3,
   '& .MuiButton-root': {
      padding: '0.6rem 1.5rem',
      width: 'unset'
   }
})

export const sxPlusBtnStyles = {
   px: 2,
   py: 0.5,
   borderRadius: '24px',
   backgroundColor: 'primaryCustom.main',
   color: '#fff',
   ml: 1,
   '&:hover': {
      backgroundColor: 'primaryCustom.light'
   },
   '& svg': {
      fontSize: '1.7rem',
      fontWeight: 700
   }
}