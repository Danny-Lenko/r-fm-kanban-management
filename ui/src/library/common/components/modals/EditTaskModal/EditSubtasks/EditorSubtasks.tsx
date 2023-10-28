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

export const EditorSubtasks: React.FC<FormikValues> = () => {
   const { values, initialValues } = useFormikContext<FormValues>();
   const { subtasks } = values;
   const initialSubtasks = initialValues.subtasks;

   const getInitialValue = (id: string) => {
      return initialSubtasks.find((subtask) => subtask.id === id);
   };

   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push({
         id: crypto.randomUUID(),
         title: `New Subtask`,
         isCompleted: false,
      });
   };

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
                        initialValue={getInitialValue(subtask.id)!}
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
