import { useField } from 'formik';
import { IFieldArray } from '../../../../../../interfaces';

const placeholders = [
   'e.g. Make coffee',
   'e.g. Drink coffee and smile',
   'e.g. Make coffee to friends',
   'e.g. Invite friends for coffee',
   'e.g. Drink coffee with friends',
];

export const useSubtaskProps = ({ index, arrayHelpers }: IFieldArray) => {
   const [field, meta] = useField(`subtasks.${index}.title`);

   const [checkboxField, checkboxMeta] = useField(
      `subtasks.${index}.isCompleted`,
   );

   const isTouched = meta.touched;
   const error = isTouched && meta.error;

   const placeholder =
      placeholders[index] || `e.g. Seems like no time for coffee anymore`;

   const removeSubtask = ({ arrayHelpers, index }: IFieldArray) => {
      arrayHelpers.remove(index);
   };

   const stackProps = {
      direction: 'row' as 'row',
      alignItems: 'center',
   };

   const fieldProps = {
      size: 'small' as 'small',
      fullWidth: true,
      placeholder,
      error: !!error,
      helperText: isTouched && error ? error : '',
   };

   const xButtonProps = {
      // sx: { '&:hover': { backgroundColor: 'transparent' } },
      // onClick: () => removeSubtask({ arrayHelpers, index }),
   };

   return { field, checkboxField, stackProps, fieldProps, xButtonProps };
};
