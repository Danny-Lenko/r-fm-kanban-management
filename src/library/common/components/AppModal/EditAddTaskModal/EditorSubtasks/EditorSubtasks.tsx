import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Typography } from '@mui/material';

import { AppBtn } from '../../..';
import { sx } from '../../../BoardManagerModal/BoardColumnsFieldArr/boardColumnsFieldArrStyles';
import { Subtask } from '.';

export const EditorSubtasks: React.FC<FormikValues> = ({ values }) => {
   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
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
                  {values.subtasks.map((_: string, index: number) => (
                     <div key={index} className='subtask-container'>
                        <Subtask index={index} arrayHelpers={arrayHelpers} />
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
