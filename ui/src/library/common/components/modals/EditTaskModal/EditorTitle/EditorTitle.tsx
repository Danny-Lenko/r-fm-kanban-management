import { FormikValues, useFormikContext } from 'formik';
import { CssLabel } from '../../AppModal';
import { CssTextField, FormValues } from '..';

export const EditorTitle: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   touched,
   errors,
}) => {
   const formik = useFormikContext<FormValues>();
   const { title } = formik.values!;

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
