import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';


const SelectEl = ({value, onChange, cols}:any) => {
   return (
      <Select
         id="status"
         name="status"
         MenuProps={{ sx: { zIndex: 12000 } }}
         sx={{ width: '100%', fontWeight: 700, borderColor: 'primary.main', '.MuiOutlinedInput-notchedOutline': { borderColor: 'linesCustom.light' } }}
         size='small'
         value={value}
         onChange={onChange}
      >
         {
            cols.map((col:any) => <MenuItem key={col.id} value={col.name}>{col.name}</MenuItem>)
         }
      </Select>
   );
}

export default SelectEl;