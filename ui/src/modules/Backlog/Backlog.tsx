import { Typography } from '@mui/material';

import { useCategories } from '..';

export const Backlog = () => {
   const categories = useCategories();

   console.log(categories)

   return (
      <>
         <Typography variant='h1'>Hello Backlog</Typography>
      </>
   );
};
