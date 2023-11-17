import { useField } from 'formik';
import { IFieldArray } from '../../../../../../../interfaces';

const placeholders = [
   'e.g. Todo',
   'e.g. Doing',
   'e.g. On Review',
   'e.g. Done',
   'e.g. Closed',
];

export const useColumnProps = ({ index, arrayHelpers }: IFieldArray) => {
   const [field, meta] = useField(`columns.${index}.name`);

   const placeholder = placeholders[index]
      ? placeholders[index]
      : 'e.g. Consider using a new board';

   const isTouched = meta.touched;
   const error = isTouched && meta.error;

   const removeColumn = ({ arrayHelpers, index }: IFieldArray) => {
      arrayHelpers.remove(index);
   };

   const fieldProps = {
      size: 'small' as 'small',
      placeholder,
      fullWidth: true,
      error: !!error,
      helperText: isTouched && error ? error : '',
   };

   const buttonProps = {
      onClick: () => removeColumn({ arrayHelpers, index }),
   };

   return { field, fieldProps, removeColumn, buttonProps };
};
