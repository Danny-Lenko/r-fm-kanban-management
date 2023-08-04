import { FieldArrayRenderProps } from 'formik';
import { IconButton, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useSubtaskProps } from '.';
import { TextField } from '../../..';

interface Props {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
}

export const Subtask: React.FC<Props> = (props) => {
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
