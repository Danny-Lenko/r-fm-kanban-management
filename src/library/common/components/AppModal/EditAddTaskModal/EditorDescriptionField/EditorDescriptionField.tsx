import { Typography, TextField } from '@mui/material';
import { FormikValues } from 'formik';

export const EditorDescriptionField: React.FC<FormikValues> = ({
   values,
   handleChange,
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
            Description
         </Typography>
         <TextField
            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
            multiline
            rows={4}
            fullWidth
            id='description'
            name='description'
            value={values.description}
            onChange={handleChange}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
         />
      </>
   );
};
