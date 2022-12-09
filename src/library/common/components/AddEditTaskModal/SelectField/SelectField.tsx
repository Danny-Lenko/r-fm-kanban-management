import Typography from '@mui/material/Typography'
import SelectEl from '../../SelectEl/SelectEl';

const SelectField = ({
   value,
   onChange,
   cols
}: any) => {
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Status
         </Typography>

         <SelectEl
            value={value}
            onChange={onChange}
            cols={cols}
         />
      </>
   );
}

export default SelectField;