import { MenuItem } from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';

import { CssLabel } from '../..';
import { AppSelect } from '../../../..';
import { useEffect } from 'react';

interface Props extends FormikValues {
   options: string[];
}

export const EditorSelect: React.FC<Props> = ({
   values,
   handleChange,
   options,
}) => {
   const formik = useFormikContext();

   useEffect(() => {
      formik.setFieldValue('status', values.status || options[0]);
   }, []);

   return (
      <>
         <CssLabel children='Status' htmlFor='status' />
         <AppSelect
            id='status'
            name='status'
            value={values.status || options[0]}
            onChange={handleChange}
            MenuProps={{
               sx: {
                  zIndex: 100000,
               },
            }}
         >
            {options.map((option: string) => (
               <MenuItem key={option} value={option}>
                  {option}
               </MenuItem>
            ))}
         </AppSelect>
      </>
   );
};
