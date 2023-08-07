import { FormikValues } from 'formik';
import { Label, TextField } from '../..';

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
         <Label htmlFor='name'>Name</Label>
         <TextField {...fieldProps} />
      </>
   );
};

export default NameField;
