import { FormikValues } from 'formik';
import {
   // CssTextField,
   CssLabel,
} from '../../AppModal';
import { CssTextField } from '..';
// import { sx } from '../../AppModal/EditBoardModal/ColumnFields/boardColumnsFieldArrStyles';

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
      fontSize: '1.1rem'
      // sx: {{
      //    fontSize: '1.1rem',
      // }},
   };

   return (
      <>
         <CssLabel children='Title' htmlFor='title' />
         <CssTextField {...fieldProps} />
      </>
   );
};
