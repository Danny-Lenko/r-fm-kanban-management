import { MenuItem } from '@mui/material';
import { FormikValues } from 'formik';

import { Label } from '../..';
import { AppSelect } from '../../..';

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
         <Label htmlFor='status'>Status</Label>
         <AppSelect
            id='status'
            name='status'
            value={values.status}
            onChange={handleChange}
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
