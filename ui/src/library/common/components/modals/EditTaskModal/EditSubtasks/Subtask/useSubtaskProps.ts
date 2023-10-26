import { useState, useEffect } from 'react';
import { useField } from 'formik';
import { IFieldArray } from '../../../../../../interfaces';
import { SubtaskProps } from '../..';

const placeholders = [
   'e.g. Make coffee',
   'e.g. Drink coffee and smile',
   'e.g. Make coffee to friends',
   'e.g. Invite friends for coffee',
   'e.g. Drink coffee with friends',
];

export const useSubtaskProps = ({
   index,
   arrayHelpers,
   subtask,
   initialValue,
}: SubtaskProps) => {
   const { title, isCompleted } = subtask;
   const [isChecked, setIsChecked] = useState(isCompleted);

   const [field, meta] = useField(`subtasks.${index}.title`);
   const isTouched = meta.touched;
   const error = isTouched && meta.error;

   const placeholder =
      placeholders[index] || `e.g. Seems like no time for coffee anymore`;

   const initiallyCompleted = initialValue?.isCompleted;

   useEffect(() => {
      setIsChecked(subtask.isCompleted);
   }, [subtask]);

   useEffect(() => {
      arrayHelpers.replace(index, { ...subtask, isCompleted: isChecked });
      console.log(arrayHelpers);
   }, [isChecked]);

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>,
   ) => {
      setIsChecked(event.target.checked);
   };

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

   return {
      title,
      isChecked,
      isCompleted,
      initiallyCompleted,
      handleCheckboxChange,
      field,
      stackProps,
      fieldProps,
      xButtonProps,
   };
};
