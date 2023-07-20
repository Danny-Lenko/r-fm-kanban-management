import Typography from '@mui/material/Typography'
import SelectEl from '../../../SelectEl/SelectEl';

const ManagerSelect = ({formik, cols}: any) => {
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className=
            'subtasks-heading'
            variant='body2'
         >
            Current Status
         </Typography>

         <SelectEl
            value={formik.values.status}
            onChange={formik.handleChange}
            cols={cols}
         />
      </>
   );
}

export default ManagerSelect;