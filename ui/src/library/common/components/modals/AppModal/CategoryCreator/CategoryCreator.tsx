import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import {
   postQueryNames,
   useAppDispatch,
   usePostQuery,
} from '../../../../hooks';
import { setCategoryIsCreating } from '../../../../../../main/store';

import { CssTextField, CssButton } from '.';
import { CssLabel } from '..';
import { ChangeEvent, useEffect, useState } from 'react';

interface NewCategory {
   category: string;
}

export const CategoryCreator: React.FC = () => {
   const dispatch = useAppDispatch();

   const [title, setTitle] = useState('New Category');
   const [isConflict, setIsConflict] = useState(false);

   const queryClient = useQueryClient();
   const dataType = postQueryNames.newCategory;
   const { mutate, isLoading, error } = usePostQuery<NewCategory, void>(
      dataType,
   );
   const createCategory = () => {
      mutate(
         { category: title },
         {
            onSuccess: () => {
               queryClient.invalidateQueries(['boards', 'with-categories'], {
                  exact: true,
               });
               dispatch(setCategoryIsCreating(false));
            },
         },
      );
   };

   useEffect(() => {
      setIsConflict(false);
   }, [title]);

   useEffect(() => {
      if (error) {
         setIsConflict(error.toString().includes('Conflict'));
      }
   }, [error]);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTitle(value);
   };

   const buttonContent = isLoading ? (
      <>
         <CircularProgress size={20} />
         {' Loading...'}
      </>
   ) : isConflict ? (
      'Failed: Category already exists'
   ) : (
      'Create'
   );

   return (
      <>
         <Typography variant='h3'>{'Create Category'}</Typography>
         <CssLabel
            children='Type a Title'
            htmlFor='title'
            sx={{ fontSize: '15px' }}
         />
         <CssTextField
            name='title'
            id='title'
            fullWidth
            value={title}
            onChange={handleChange}
         />
         <CssButton
            color='secondary'
            onClick={createCategory}
            disabled={isLoading || isConflict}
            isConflict={isConflict}
         >
            {buttonContent}
         </CssButton>
      </>
   );
};
