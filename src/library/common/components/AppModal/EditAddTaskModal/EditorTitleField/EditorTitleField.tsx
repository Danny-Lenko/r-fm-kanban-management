import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const EditorTitleField = ({
   value,
   onChange,
   error,
   helperText,
}: any) => {
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Title
         </Typography>
         <TextField
            placeholder='e.g. Take coffee break'
            fullWidth
            id='title'
            name='title'
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
         />
      </>
   );
};
