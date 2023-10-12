import { FormikValues } from 'formik';
import { CssTextField, CssLabel } from '../../AppModal';

export const EditorTitle: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   touched,
   errors,
}) => {
   const fieldProps = {
      placeholder: 'e.g. Take coffee break',
      fullWidth: true,
      id: 'title',
      name: 'title',
      value: values.title,
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched.title && !!errors.title,
      helperText: touched.title && errors.title,
   };

   return (
      <>
         <CssLabel children='Title' htmlFor='title' />
         <CssTextField {...fieldProps} />
      </>
   );
};
