import { FieldArray, FieldArrayRenderProps } from 'formik';
import { Typography, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { AppBtn } from '../../..';
import { sx } from '../../../BoardManagerModal/BoardColumnsFieldArr/boardColumnsFieldArrStyles';

export const EditorSubtasksFieldArr = ({
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
            style={sx.columns}
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
                           sx={sx.iconBtn}
                           onClick={() => removeSubtask(arrayHelpers, index)}
                        >
                           <ClearIcon fontSize='small' />
                        </IconButton>
                     </div>
                  ))}
                  <AppBtn
                     onClick={() => addSubtask(arrayHelpers)}
                     buttonSize='small'
                     color='secondary'
                     sx={sx.addBtn}
                  >
                     + Add New Subtask
                  </AppBtn>
               </div>
            )}
         />
      </>
   );
};
