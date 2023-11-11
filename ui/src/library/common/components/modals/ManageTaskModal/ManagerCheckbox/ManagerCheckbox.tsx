import { FormikProps, FormikValues } from 'formik';
import { FormGroup } from '@mui/material';

import { CssControlLabel, CssCheckbox } from '.';
import { CssLabel } from '../../AppModal';

// type Props = {
//    formikValues: {
//       formik: FormikProps<FormikValues>;
//       activeTask: Task;
//    };
// };

// type Task = {
//    id: string;
//    completedSubtasks: number;
//    title: string;
//    description: string;
//    status: string;
//    subtasks: Subtask[];
// };

// type Subtask = {
//    title: string;
//    isCompleted: boolean;
// };

import { Subtask } from '../../EditTaskModal';

import { ISubtask } from '../../../../../interfaces';

export const ManagerCheckbox: React.FC<FormikValues> = ({
   values,
   subtasks,
}) => {
   // const { formik, activeTask } = formikValues;
   // const { completedSubtasks, subtasks } = activeTask;

   // const subtasks = values.subtasks as ISubtask[];


   return (
      <>
         {/* <CssLabel>
            Subtasks ({completedSubtasks} of {subtasks.length})
         </CssLabel> */}
         <FormGroup>
            {subtasks.map((subtask: ISubtask) => {
               const { title, isCompleted } = subtask;

               return (
                  // <>
                  <CssControlLabel
                     key={title}
                     completed={isCompleted ? 1 : null}
                     control={
                        <CssCheckbox
                           value={title}
                           defaultChecked={isCompleted}
                        />
                     }
                     // label={title}
                     label={''}
                     name='checked'
                     // onChange={formik.handleChange}
                  />
                  // </>
               );
            })}
         </FormGroup>
      </>
   );
};
