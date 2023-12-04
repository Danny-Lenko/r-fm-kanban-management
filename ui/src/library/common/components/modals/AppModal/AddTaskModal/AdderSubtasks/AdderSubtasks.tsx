import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Stack } from '@mui/material';

import { AppBtn, CssLabel } from '../../../..';
import { Subtask } from '.';

export const AdderSubtasks: React.FC<FormikValues> = ({ values }) => {
   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   return (
      <>
         <CssLabel children='Subtask' />

         <FieldArray
            name='subtasks'
            render={(arrayHelpers) => (
               <Stack gap={1.5}>
                  {values.subtasks.map((_: string, index: number) => (
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
                  >
                     + Add New Subtask
                  </AppBtn>
               </Stack>
            )}
         />
      </>
   );
};
