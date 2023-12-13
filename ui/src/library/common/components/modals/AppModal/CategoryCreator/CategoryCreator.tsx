import { Typography } from '@mui/material';

import { CssTextField, CssButton } from '.';
import { CssLabel } from '..';

export const CategoryCreator: React.FC = () => {
   return (
      <>
         <Typography variant='h3'>Create Category</Typography>
         <CssLabel
            children='Type a Title'
            htmlFor='title'
            sx={{ fontSize: '15px' }}
         />
         <CssTextField name='title' id='title' fullWidth />
         <CssButton color='secondary'>{'Create'}</CssButton>
      </>
   );
};
