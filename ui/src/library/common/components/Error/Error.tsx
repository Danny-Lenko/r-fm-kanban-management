import { Typography, Stack, styled } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface Props {
   children?: React.ReactNode;
}

const CssError = styled(Typography)(({ theme }) => ({
   '&.MuiTypography-root': {
      color: theme.palette.error.main,
      marginBottom: 0,
   },
}));

export const Error: React.FC<Props> = ({ children }) => {
   return (
      <>
         <CssError variant='h3' mt={2}>
            <Stack direction='row' alignItems='center'>
               <ErrorIcon />
               {'Error:'}
            </Stack>
         </CssError>
         <CssError variant='h3'>{'Failed to connect to the server.'}</CssError>
         <br />
         {children && <Typography>{children}</Typography>}
      </>
   );
};
