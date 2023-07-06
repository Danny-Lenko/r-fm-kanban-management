import Typography from '@mui/material/Typography';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { AppBtn } from '../..';

const ColumnsFieldArr = ({
   columns,
   value,
   onChange,
   tochedColumns,
   errorsColumns,
}: any) => {
   const placeholders = [
      'e.g. Todo',
      'e.g. Doing',
      'e.g. On Review',
      'e.g. Done',
      'e.g. Closed',
   ];

   const addColumn = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   const removeColumn = (arr: FieldArrayRenderProps, index: number) => {
      arr.remove(index);
   };

   return (
      <>
         <Typography
            style={{ margin: '24px 0 8px' }}
            className='subtasks-heading'
            variant='body2'
         >
            Columns
         </Typography>

         <FieldArray
            name='columns'
            render={(arrayHelpers) => (
               <div className='subtasks-list'>
                  {columns.map((sub: any, index: number) => (
                     <div key={index} className='subtask-container'>
                        <TextField
                           placeholder={
                              placeholders[index]
                                 ? placeholders[index]
                                 : 'e.g. Consider using a new board'
                           }
                           name={`columns.${index}`}
                           fullWidth
                           id={`columns.${index}`}
                           value={value[index]}
                           onChange={onChange}
                           error={
                              tochedColumns &&
                              Boolean(errorsColumns ? errorsColumns[index] : '')
                           }
                           helperText={
                              tochedColumns && errorsColumns
                                 ? errorsColumns[index]
                                 : ''
                           }
                        />
                        <IconButton
                           sx={{ p: 0 }}
                           onClick={() => removeColumn(arrayHelpers, index)} // remove a col from the list
                        >
                           <ClearIcon fontSize='small' />
                        </IconButton>
                     </div>
                  ))}
                  <AppBtn
                     // onclick={() => arrayHelpers.push('')} // add a col to the list
                     onClick={() => addColumn(arrayHelpers)}
                     sizeSm={true}
                     color='secondary'
                     styles={{ width: '100%' }}
                  >
                     + Add New Column
                  </AppBtn>
               </div>
            )}
         />
      </>
   );
};

export default ColumnsFieldArr;
