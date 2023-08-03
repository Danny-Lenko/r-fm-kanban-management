import { useField, FieldArrayRenderProps } from 'formik';
import { IconButton, TextField, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
}

const placeholders = [
   'e.g. Make coffee',
   'e.g. Drink coffee and smile',
   'e.g. Make coffee to friends',
   'e.g. Invite friends for coffee',
   'e.g. Drink coffee with friends',
];

export const Subtask: React.FC<Props> = ({ index, arrayHelpers }) => {
   const [field, meta] = useField(`subtasks.${index}`);
   const isTouched = meta.touched;
   const error = isTouched && meta.error;

   const placeholder =
      placeholders[index] || `e.g. Seems like no time for coffee anymore`;

   const removeSubtask = (arr: FieldArrayRenderProps, index: number) => {
      arr.remove(index);
   };

   const stackProps = {
      direction: 'row' as 'row',
      gap: 2,
   };

   const fieldProps = {
      size: 'small' as 'small',
      fullWidth: true,
      placeholder,
      error: !!error,
      helperText: isTouched && error ? error : '',
   };

   const xButtonProps = {
      sx: { '&:hover': { backgroundColor: 'transparent' } },
      onClick: () => removeSubtask(arrayHelpers, index),
   };

   return (
      <Stack {...stackProps}>
         <TextField {...field} {...fieldProps} />
         <IconButton {...xButtonProps}>
            <ClearIcon fontSize='small' />
         </IconButton>
      </Stack>
   );
};
