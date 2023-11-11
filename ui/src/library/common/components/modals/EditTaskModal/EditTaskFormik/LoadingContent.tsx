import { CssLabel } from '../../AppModal';
import { Skeleton, Stack } from '@mui/material';

export const LoadingContent = () => {
   return (
      <>
         <CssLabel children='Title' />
         <Skeleton variant='rounded' height={30} />

         <CssLabel children='Description' />
         <Skeleton variant='rounded' height={60} />

         <CssLabel children='Subtasks' />
         {Array.from({ length: 4 }).map(() => (
            <Skeleton
               key={crypto.randomUUID()}
               variant='rounded'
               height={30}
               sx={{ mt: 1 }}
            />
         ))}

         <CssLabel children='Status' />
         <Skeleton variant='rounded' height={40} />

         <Stack direction='row' justifyContent='space-between' mt={2}>
            <Skeleton variant='rounded' width={'60%'} height={40} />
            <Skeleton variant='rounded' width={'30%'} height={40} />
         </Stack>
      </>
   );
};
