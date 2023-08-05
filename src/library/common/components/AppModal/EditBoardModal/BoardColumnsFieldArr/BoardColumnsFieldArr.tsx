import Typography from '@mui/material/Typography';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { AppBtn } from '../../..';
import { sx } from './boardColumnsFieldArrStyles';

const placeholders = [
   'e.g. Todo',
   'e.g. Doing',
   'e.g. On Review',
   'e.g. Done',
   'e.g. Closed',
];

const ColumnsFieldArr = ({
   columns,
   value,
   onChange,
   tochedColumns,
   errorsColumns,
}: any) => {
   const addColumn = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   const removeColumn = (arr: FieldArrayRenderProps, index: number) => {
      arr.remove(index);
   };

   return (
      <>
         <Typography
            style={sx.columns}
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
                           sx={sx.iconBtn}
                           onClick={() => removeColumn(arrayHelpers, index)}
                        >
                           <ClearIcon fontSize='small' />
                        </IconButton>
                     </div>
                  ))}
                  <AppBtn
                     onClick={() => addColumn(arrayHelpers)}
                     buttonSize='small'
                     color='secondary'
                     sx={sx.addBtn}
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
