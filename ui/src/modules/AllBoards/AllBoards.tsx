import { Stack, Typography } from '@mui/material';
import { useApi } from '../../library/common/hooks';

export const AllBoards = () => {
   const { data, loading, error } = useApi('/boards');

   if (data) {
      console.log(data);
   }

   return (
      <Stack
         height='100vh'
         width='100vw'
         alignItems='center'
         justifyContent='center'
      >
         <Typography variant='h1'>All Boards</Typography>
      </Stack>
   );
};
