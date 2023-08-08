import { IconButton, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { IFieldArray } from '../../../../../../interfaces';

import { useSubtaskProps } from '.';
import { TextField } from '../../..';

export const Subtask: React.FC<IFieldArray> = (props) => {
   const { stackProps, field, fieldProps, xButtonProps } =
      useSubtaskProps(props);

   return (
      <Stack {...stackProps}>
         <TextField {...field} {...fieldProps} />
         <IconButton {...xButtonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
