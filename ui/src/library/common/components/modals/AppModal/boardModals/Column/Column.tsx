import { Stack, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useColumnProps } from '.';
import { CssTextField } from '../..';
import { IFieldArray } from '../../../../../../interfaces';

export const Column: React.FC<IFieldArray> = (props) => {
   const { field, fieldProps, buttonProps } = useColumnProps(props);

   return (
      <Stack direction='row' gap={1}>
         <CssTextField {...field} {...fieldProps} />
         <IconButton {...buttonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
