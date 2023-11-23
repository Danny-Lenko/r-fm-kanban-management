import { MenuItem } from '@mui/material';
import { FormikValues } from 'formik';

import { CssLabel } from '../..';
import { AppSelect } from '../../../..';

interface Props extends FormikValues {
   options: string[];
}

export const EditorSelect: React.FC<Props> = ({
   values,
   handleChange,
   options,
}) => {
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
