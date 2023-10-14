import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Stack } from '@mui/material';

import { AppBtn, CssLabel } from '../../..';
import { Subtask } from '.';

export const EditorSubtasks: React.FC<FormikValues> = ({ values }) => {
   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   const { subtasks } = values;

   return (
      <>
         <CssLabel children='Subtask' />

         <FieldArray
            name='subtasks'
            render={(arrayHelpers) => (
               <Stack>
                  {subtasks.map((_: string, index: number) => (
                     <Subtask
                        key={index}
                        index={index}
                        arrayHelpers={arrayHelpers}
                     />
                  ))}

                  <AppBtn
                     onClick={() => addSubtask(arrayHelpers)}
                     buttonSize='small'
                     color='secondary'
                     sx={{ marginTop: 1 }}
                  >
                     + Add New Subtask
                  </AppBtn>
               </Stack>
            )}
         />
      </>
   );
};
