import { FormikValues, useFormikContext } from 'formik';

import { CssTextField, FormValues } from '..';
import { CssLabel } from '../../AppModal';

import { useAppDispatch } from '../../../../hooks';
import { setModalIsSubmitting } from '../../../../../../main/store';
import { useEffect } from 'react';

export const EditorTitle: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   touched,
   errors,
   isSubmitting,
}) => {
   const dispatch = useAppDispatch();

   const formik = useFormikContext<FormValues>();
   const { title } = formik.values!;

   useEffect(() => {
      dispatch(setModalIsSubmitting(isSubmitting));
   }, [isSubmitting]);

   const fieldProps = {
      placeholder: 'e.g. Take coffee break',
      fullWidth: true,
      id: 'title',
      name: 'title',
      value: title,
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched.title && !!errors.title,
      helperText: touched.title && errors.title,
      fontSize: '1.1rem',
   };

   return (
      <>
         <CssLabel children='Title' htmlFor='title' />
         <CssTextField {...fieldProps} />
      </>
   );
};
