import {
   FieldArray,
   FieldArrayRenderProps,
   FormikValues,
   useFormikContext,
} from 'formik';
import { Stack } from '@mui/material';

import { AppBtn, CssLabel } from '../../..';
import { Subtask } from '.';
import { FormValues } from '..';
// import { ISubtask } from '../../../../../interfaces';
import { useEffect } from 'react';

// interface Props extends FormikValues {
//    subtasks: ISubtask[];
// }

export const EditorSubtasks: React.FC<FormikValues> = () => {
   const { values } = useFormikContext<FormValues>();
   const { subtasks } = values;

   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push({
         id: crypto.randomUUID(),
         title: `New Subtask`,
         isCompleted: false,
      });
   };

   useEffect(() => {
      console.log(values);
   }, [values]);

   return (
      <>
         <CssLabel children='Subtasks' />

         <FieldArray
            name='subtasks'
            render={(arrayHelpers) => (
               <Stack>
                  {subtasks.map((subtask, index) => (
                     <Subtask
                        key={index}
                        index={index}
                        arrayHelpers={arrayHelpers}
                        subtask={subtask}
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
