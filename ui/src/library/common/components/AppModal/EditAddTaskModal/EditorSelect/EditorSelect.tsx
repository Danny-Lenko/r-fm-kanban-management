import { MenuItem } from '@mui/material';
import { FormikValues } from 'formik';

import { CssLabel } from '../../../modals/AppModal';
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
         <CssLabel children='Status' htmlFor='status' />
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
