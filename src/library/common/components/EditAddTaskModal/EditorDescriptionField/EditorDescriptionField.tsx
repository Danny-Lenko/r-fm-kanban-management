import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const DescriptionField = ({
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
            Description
         </Typography>
         <TextField
            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
            multiline
            rows={4}
            fullWidth
            id="description"
            name="description"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
         />
      </>
   );
}

export default DescriptionField;