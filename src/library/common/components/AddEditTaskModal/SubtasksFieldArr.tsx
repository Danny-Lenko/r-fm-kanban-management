import Typography from '@mui/material/Typography'
import { FieldArray } from 'formik';
import CustomBtn from '../CustomBtn/CustomBtn';
import TextField from '@mui/material/TextField'
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const SubtasksFieldArr = ({
   subtasks,
   value,
   onChange,
   tochedSubtasks,
   errorsSubtasks
}:any) => {
   const placeholders = ['e.g. Make coffee', 'e.g. Drink coffee and smile', 'e.g. Make coffee to friends', 'e.g. Invite friends for coffee', 'e.g. Drink coffee with friends']
   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Subtasks
         </Typography>

         <FieldArray
            name="subtasks"
            render={arrayHelpers => (
               <div className='subtasks-list'>

                  { subtasks.map((sub:any, index:number) => (
                     <div key={index} className='subtask-container'>
                        <TextField
                           placeholder={ placeholders[index] ? placeholders[index] : 'e.g. Seems like no time for coffee anymore' }
                           name={`subtasks.${index}`}
                           fullWidth
                           id={`subtasks.${index}`}
                           value={value[index]}
                           onChange={onChange}
                           error={tochedSubtasks && Boolean(errorsSubtasks ? errorsSubtasks[index] : '')}
                           helperText={tochedSubtasks && errorsSubtasks ? errorsSubtasks[index] : ''}
                        />
                        <IconButton
                           sx={{p: 0}}
                           onClick={() => arrayHelpers.remove(index)} // remove a sub from the list
                        >
                           <ClearIcon fontSize='small' />
                        </IconButton>
                     </div>
                  )) }
                  <CustomBtn
                     onclick={() => arrayHelpers.push('')} // add a sub to the list
                     sizeSm={true}
                     color='secondary'
                     text='+ Add New Subtask'
                     styles={{ width: '100%' }}
                  />
               </div>
            )}
         />
      </>
   );
}

export default SubtasksFieldArr;