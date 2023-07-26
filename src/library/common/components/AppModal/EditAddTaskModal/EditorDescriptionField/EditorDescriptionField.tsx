import { Typography, TextField } from '@mui/material';

import { Formik, FormikProps, FormikValues } from 'formik';

// type Props = {
//    props: FormikProps<FormikValues>
// }

// type Props =

export const EditorDescriptionField = ({
   value,
   onChange,
   error,
   helperText,
}: any) => {
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
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
         />
      </>
   );
};
