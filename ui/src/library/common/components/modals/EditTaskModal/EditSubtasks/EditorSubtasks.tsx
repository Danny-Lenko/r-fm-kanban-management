import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Stack } from '@mui/material';

import { AppBtn, CssLabel } from '../../..';
import { Subtask } from '.';
import { ISubtask } from '../../../../../interfaces';

interface Props extends FormikValues {
   subtasks: ISubtask[];
}

export const EditorSubtasks: React.FC<Props> = ({ values, subtasks }) => {
   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
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
