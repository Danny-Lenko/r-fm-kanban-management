import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';
import { Stack } from '@mui/material';

import { AppBtn, CssLabel } from '../../..';
import { Subtask } from '.';

import { CssControlLabel } from '../../ManageTaskModal';
import { ISubtask } from '../../../../../interfaces';

import { CssCheckbox } from '../../ManageTaskModal';

interface Props extends FormikValues {
   subtasks: ISubtask[];
}

export const EditorSubtasks: React.FC<Props> = ({ values, subtasks }) => {
   const addSubtask = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   console.log(subtasks);
   // const { subtasks } = values;

   return (
      <>
         <CssLabel children='Subtask' />

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
