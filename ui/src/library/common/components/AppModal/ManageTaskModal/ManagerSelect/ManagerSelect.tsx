import { FormikValues } from 'formik';
import { MenuItem } from '@mui/material';
import { AppSelect, CssLabel } from '../../..';

type Props = {
   formikValues: {
      formik: FormikValues;
      columns: { name: string }[];
   };
};

export const ManagerSelect: React.FC<Props> = ({ formikValues }) => {
   const { formik, columns } = formikValues;
   const options = columns.map((col) => col.name);

   return (
      <>
         <CssLabel children='Current Status' htmlFor='status' />

         <AppSelect
            id='status'
            name='status'
            value={formik.values.status}
            onChange={formik.handleChange}
         >
            {options.map((option) => (
               <MenuItem key={option} value={option}>
                  {option}
               </MenuItem>
            ))}
         </AppSelect>
      </>
   );
};
