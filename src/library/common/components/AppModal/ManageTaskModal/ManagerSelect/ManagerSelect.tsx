import Typography from '@mui/material/Typography';
import SelectEl from '../../../SelectEl/SelectEl';
import { SubtasksHeading } from '..';

export const ManagerSelect = ({ formik, cols }: any) => {
   return (
      <>
         <SubtasksHeading style={{ margin: '24px 0 8px' }} variant='body2'>
            Current Status
         </SubtasksHeading>

         <SelectEl
            value={formik.values.status}
            onChange={formik.handleChange}
            cols={cols}
         />
      </>
   );
};
