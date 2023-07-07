import Typography from '@mui/material/Typography';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { AppBtn } from '../../AppBtn';

const SubtasksFieldArr = ({
   subtasks,
   value,
   onChange,
   tochedSubtasks,
   errorsSubtasks,
}: any) => {
   const placeholders = [
      'e.g. Make coffee',
      'e.g. Drink coffee and smile',
      'e.g. Make coffee to friends',
      'e.g. Invite friends for coffee',
      'e.g. Drink coffee with friends',
   ];

   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   const removeSubtask = (arr: FieldArrayRenderProps, index: number) => {
      arr.remove(index);
   };

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
            name='subtasks'
            render={(arrayHelpers) => (
               <div className='subtasks-list'>
                  {subtasks.map((sub: any, index: number) => (
                     <div key={index} className='subtask-container'>
                        <TextField
                           placeholder={
                              placeholders[index]
                                 ? placeholders[index]
                                 : 'e.g. Seems like no time for coffee anymore'
                           }
                           name={`subtasks.${index}`}
                           fullWidth
                           id={`subtasks.${index}`}
                           value={value[index]}
                           onChange={onChange}
                           error={
                              tochedSubtasks &&
                              Boolean(
                                 errorsSubtasks ? errorsSubtasks[index] : '',
                              )
                           }
                           helperText={
                              tochedSubtasks && errorsSubtasks
                                 ? errorsSubtasks[index]
                                 : ''
                           }
                        />
                        <IconButton
                           sx={{ p: 0 }}
                           onClick={() => removeSubtask(arrayHelpers, index)}
                        >
                           <ClearIcon fontSize='small' />
                        </IconButton>
                     </div>
                  ))}
                  <AppBtn
                     // onclick={() => addSubtask(arrayHelpers)}
                     buttonSize='small'
                     color='secondary'
                     styles={{ width: '100%' }}
                  >
                     + Add New Subtask
                  </AppBtn>
               </div>
            )}
         />
      </>
   );
};

export default SubtasksFieldArr;
