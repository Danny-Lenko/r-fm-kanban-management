import { FormikValues } from 'formik';
import { CssLabel, CssTextField } from '../../../modals/AppModal';

export const EditorDescription: React.FC<FormikValues> = ({
   values,
   handleChange,
   touched,
   errors,
}) => {
   const fieldProps = {
      placeholder: `e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`,
      multiline: true,
      rows: 4,
      fullWidth: true,
      id: 'description',
      name: 'description',
      value: values.description,
      onChange: handleChange,
      error: touched.description && !!errors.description,
      helperText: touched.description && errors.description,
   };

   return (
      <>
         <CssLabel children='Description' htmlFor='description' />
         <CssTextField {...fieldProps} />
      </>
   );
};
