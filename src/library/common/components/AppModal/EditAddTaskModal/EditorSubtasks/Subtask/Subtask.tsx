import { useField, FieldArrayRenderProps } from 'formik';
import { IconButton, TextField } from '@mui/material';
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
   const placeholder =
      placeholders[index] || 'e.g. Seems like no time for coffee anymore';
   const isTouched = meta.touched;
   const error = isTouched && meta.error;

   const removeSubtask = (arr: FieldArrayRenderProps, index: number) => {
      arr.remove(index);
   };

   return (
      <div className='subtask-container'>
         <TextField
            {...field}
            fullWidth
            placeholder={placeholder}
            error={!!error}
            helperText={isTouched && error ? error : ''}
         />
         <IconButton
            // sx={sx.iconBtn}
            onClick={() => removeSubtask(arrayHelpers, index)}
         >
            <ClearIcon fontSize='small' />
         </IconButton>
      </div>
   );
};
