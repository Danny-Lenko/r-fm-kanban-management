import { FormikValues } from 'formik';
import { Typography, TextField } from '@mui/material';

export const EditorTitleField: React.FC<FormikValues> = ({
   values,
   handleChange,
   handleBlur,
   touched,
   errors,
}) => {
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Title
         </Typography>
         <TextField
            placeholder='e.g. Take coffee break'
            fullWidth
            id='title'
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
         />
      </>
   );
};
