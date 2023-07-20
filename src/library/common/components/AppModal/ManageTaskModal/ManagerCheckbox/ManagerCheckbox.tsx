import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { assembleCheckboxStyles } from '../manageTaskModalStyles';

const ManagerCheckbox = ({formik, task, theme}:any) => {
   return (
      <>
         <Typography
            className='subtasks-heading'
            variant='body2'
         >
            Subtasks ({task.completedSubtasks} of {task.subtasks.length})
         </Typography>
         <FormGroup>
            {
               task.subtasks.map( (sub:any) =>
                  <FormControlLabel
                     key={sub.title}
                     sx={assembleCheckboxStyles(sub, theme)}
                     control={<Checkbox value={sub.title} defaultChecked={sub.isCompleted} />}
                     label={sub.title}
                     name='checked'
                     onChange={formik.handleChange}
                  />
               )
            }
         </FormGroup>
      </>
   );
}

export default ManagerCheckbox;