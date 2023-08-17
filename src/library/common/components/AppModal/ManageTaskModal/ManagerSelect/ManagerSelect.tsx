import { FormikValues } from 'formik';
import { MenuItem } from '@mui/material';
import { AppSelect, CssLabel } from '../../..';

interface Props extends FormikValues {
   options: string[];
}

export const ManagerSelect: React.FC<Props> = ({
   values,
   handleChange,
   options,
}) => {
   return (
      <>
         <CssLabel children='Current Status' htmlFor='status' />

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
