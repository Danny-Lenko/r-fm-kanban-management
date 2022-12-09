import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

const SelectEl = ({value, onChange, cols}:any) => {
   const theme = useTheme()
   const componentStyles = (theme:any) => ({
      width: '100%', 
      fontWeight: 700, 
      borderColor: 'primary.main', 
      '.MuiOutlinedInput-notchedOutline': { 
         borderColor: theme.palette.divider 
      }
   })

   return (
      <Select
         id="status"
         name="status"
         MenuProps={{ sx: { zIndex: 12000 } }}
         sx={ componentStyles(theme) }
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