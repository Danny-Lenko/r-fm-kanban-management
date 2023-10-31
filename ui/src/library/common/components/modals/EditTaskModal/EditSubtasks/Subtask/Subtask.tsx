import { IconButton, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useSubtaskProps } from '.';
import { CssTextField, SubtaskProps } from '../..';
import { CssControlLabel } from '../../../ManageTaskModal';
import { CssCheckbox } from '../../../ManageTaskModal';

export const Subtask: React.FC<SubtaskProps> = (props) => {
   const {
      title,
      isCompleted,
      isChecked,
      handleCheckboxChange,
      initiallyCompleted,
      stackProps,
      field,
      fieldProps,
      xButtonProps,
   } = useSubtaskProps(props);


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
            completed={initiallyCompleted ? 1 : undefined}
            checked={isChecked ? 1 : undefined}
         />
         <IconButton {...xButtonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
