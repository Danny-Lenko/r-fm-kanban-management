import Typography from '@mui/material/Typography'
import { FieldArray } from 'formik';
import CustomBtn from '../CustomBtn/CustomBtn';
import TextField from '@mui/material/TextField'

const SubtasksFieldArr = ({
   subtasks,
   value,
   onChange,
   tochedSubtasks,
   errorsSubtasks
}:any) => {
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
                           name={`subtasks.${index}`}
                           fullWidth
                           id={`subtasks.${index}`}
                           value={value[index]}
                           onChange={onChange}
                           error={tochedSubtasks && Boolean(errorsSubtasks ? errorsSubtasks[index] : '')}
                           helperText={tochedSubtasks && errorsSubtasks ? errorsSubtasks[index] : ''}
                        />
                        <button
                           type="button"
                           onClick={() => arrayHelpers.remove(index)} // remove a sub from the list
                        >
                           -
                        </button>
                     </div>
                  )) }
                  <CustomBtn
                     onclick={() => arrayHelpers.push('')}
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