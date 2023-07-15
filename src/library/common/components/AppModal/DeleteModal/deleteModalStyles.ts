import { Theme } from '@mui/system';

export const deleteModalStyles = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

export const deleteBtnSx = (theme: Theme) => ({
   backgroundColor: theme.palette.destructCustom.main,
});

// export const deleteModalStyles = (theme: Theme) => ({
//    zIndex: 11000,
//    p: { xs: 3, sm: 4 },
//    borderRadius: '8px',
//    width: { xs: '300px', sm: '480px' },
//    my: 5,
//    '& .MuiTypography-h3': {
//       color: theme.palette.text.primary
//    },
//    '& .MuiTypography-body1': {
//       color: 'greyCustom.200',
//       my: 3
//    },
// })
