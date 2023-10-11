import { FormikValues } from 'formik';
import { CssLabel, CssTextField } from '../../../modals/AppModal';

export const NameField: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   errors,
   touched,
}) => {
   const fieldProps = {
      placeholder: `e.g. Web Design`,
      fullWidth: true,
      id: 'name',
      name: 'name',
      value: values.name,
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched.name && !!errors.name,
      helperText: touched.name && errors.name,
   };

   return (
      <>
         <CssLabel children='Name' htmlFor='name' />
         <CssTextField {...fieldProps} />
      </>
   );
};

export default NameField;
