import Masonry from '@mui/lab/Masonry';

import { Accordion, CssContainer } from '.';
import { useCategories } from '..';

const gridColumns = {
   xs: 1,
   sm: 2,
   md: 3,
   lg: 4,
   xl: 5,
};

export const MasonryGrid = () => {
   const categories = useCategories();

   return (
      <CssContainer>
         <Masonry columns={gridColumns} spacing={3}>
            {categories.map((category, idx) => (
               <Accordion
                  key={crypto.randomUUID()}
                  category={category}
                  idx={idx}
               />
            ))}
         </Masonry>
      </CssContainer>
   );
};
