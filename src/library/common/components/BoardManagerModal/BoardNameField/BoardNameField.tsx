import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const NameField = ({
   value,
   onChange,
   error,
   helperText
}:any) => {
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Name
         </Typography>
         <TextField
            placeholder='e.g. Web Design'
            fullWidth
            id="name"
            name="name"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
         />
      </>
   );
}

export default NameField;