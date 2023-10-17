import { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { IFieldArray } from '../../../../../../interfaces';

import { useSubtaskProps } from '.';
import { CssTextField } from '../..';

import { CssControlLabel } from '../../../ManageTaskModal';
import { CssCheckbox } from '../../../ManageTaskModal';

export const Subtask: React.FC<IFieldArray> = (props) => {
   const { stackProps, field, fieldProps, xButtonProps } =
      useSubtaskProps(props);

   const { title, isCompleted } = props.subtask!;

   const [isChecked, setIsChecked] = useState(isCompleted);

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>,
   ) => {
      setIsChecked(event.target.checked);
      console.log('state changed')
   };

   return (
      <Stack {...stackProps}>
         <CssControlLabel
            key={title}
            completed={isCompleted ? 1 : null}
            control={
               <CssCheckbox
                  value={title}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
               />
            }
            label={''}
            name='checked'
         />

         <CssTextField
            {...field}
            {...fieldProps}
            completed={isCompleted ? 1 : undefined}
            checked={isChecked ? 1 : undefined}
         />
         <IconButton {...xButtonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
