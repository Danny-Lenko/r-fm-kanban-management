import { FormikValues, useFormikContext } from 'formik';
import {
   // CssTextField,
   CssLabel,
} from '../../AppModal';
import { CssTextField } from '..';
// import { sx } from '../../AppModal/EditBoardModal/ColumnFields/boardColumnsFieldArrStyles';

type FormValues = {
   title: string;
   description: string;
   subtasks: string[]; // Adjust the type according to your data structure
   status: string;
   columnOptions: string[];
};

export const EditorTitle: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   touched,
   errors,
}) => {
   const formik = useFormikContext<FormValues>();
   const { title } = formik.values!;
   console.log(formik.initialValues);

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
