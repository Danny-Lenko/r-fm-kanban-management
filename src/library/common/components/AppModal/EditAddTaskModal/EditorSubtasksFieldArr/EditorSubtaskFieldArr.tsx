import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Typography, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { AppBtn } from '../../..';
import { sx } from '../../../BoardManagerModal/BoardColumnsFieldArr/boardColumnsFieldArrStyles';
import { generateValues } from '.';

export const EditorSubtasksFieldArr: React.FC<FormikValues> = (props) => {
   const values = props.values.subtasks;
   const touched = props.touched.subtasks;
   const errors = props.errors.subtasks;
   const handleChange = props.handleChange;
   const handleBlur = props.handleBlur;

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
                  {values.map((_: string, index: number) => {
                     const { placeholder } = generateValues(index);
                     const isTouched = touched && touched[index];
                     const error = isTouched && errors && errors[index];

                     return (
                        <div key={index} className='subtask-container'>
                           <TextField
                              placeholder={placeholder}
                              name={`subtasks.${index}`}
                              fullWidth
                              id={`subtasks.${index}`}
                              value={values[index]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={!!error}
                              helperText={(isTouched && error) || error}
                           />
                           <IconButton
                              sx={sx.iconBtn}
                              onClick={() => removeSubtask(arrayHelpers, index)}
                           >
                              <ClearIcon fontSize='small' />
                           </IconButton>
                        </div>
                     );
                  })}

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
