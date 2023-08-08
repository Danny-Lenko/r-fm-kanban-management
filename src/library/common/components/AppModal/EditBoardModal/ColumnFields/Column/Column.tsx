import { Stack, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { IFieldArray } from '../../../../../../interfaces';

import { TextField } from '../../..';
import { useColumnProps } from '.';

export const Column: React.FC<IFieldArray> = (props) => {
   const { field, fieldProps, buttonProps } = useColumnProps(props);

   return (
      <Stack direction='row' gap={1}>
         <TextField {...field} {...fieldProps} />
         <IconButton {...buttonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
