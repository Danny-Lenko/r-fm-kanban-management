import { FormikProps, FormikValues } from 'formik';
import { FormGroup } from '@mui/material';

import { CssControlLabel, CssCheckbox } from '.';
import { CssLabel } from '../..';

type Props = {
   formikValues: {
      formik: FormikProps<FormikValues>;
      activeTask: Task;
   };
};

type Task = {
   id: number;
   completedSubtasks: number;
   title: string;
   description: string;
   status: string;
   subtasks: Subtask[];
};

type Subtask = {
   title: string;
   isCompleted: boolean;
};

export const ManagerCheckbox: React.FC<Props> = ({ formikValues }) => {
   const { formik, activeTask } = formikValues;
   const { completedSubtasks, subtasks } = activeTask;

   return (
      <>
         <CssLabel>
            Subtasks ({completedSubtasks} of {subtasks.length})
         </CssLabel>
         <FormGroup>
            {subtasks.map((subtask) => {
               const { title, isCompleted } = subtask;

               return (
                  <CssControlLabel
                     key={title}
                     subtask={subtask}
                     control={
                        <CssCheckbox
                           value={title}
                           defaultChecked={isCompleted}
                        />
                     }
                     label={title}
                     name='checked'
                     onChange={formik.handleChange}
                  />
               );
            })}
         </FormGroup>
      </>
   );
};
