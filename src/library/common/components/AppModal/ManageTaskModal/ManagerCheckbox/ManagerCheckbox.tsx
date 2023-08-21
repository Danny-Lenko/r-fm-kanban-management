import { FormikProps, FormikValues } from 'formik';
import { FormGroup } from '@mui/material';

import { CssControlLabel, CssCheckbox } from '.';
import { CssLabel } from '../..';

type Props = {
   formikValues: {
      formik: FormikProps<FormikValues>;
      managedTask: Task;
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
   const { formik, managedTask: task } = formikValues;
   return (
      <>
         <CssLabel>
            Subtasks ({task.completedSubtasks} of {task.subtasks.length})
         </CssLabel>
         <FormGroup>
            {task.subtasks.map((sub: Subtask) => (
               <CssControlLabel
                  key={sub.title}
                  subtask={sub}
                  control={
                     <CssCheckbox
                        value={sub.title}
                        defaultChecked={sub.isCompleted}
                     />
                  }
                  label={sub.title}
                  name='checked'
                  onChange={formik.handleChange}
               />
            ))}
         </FormGroup>
      </>
   );
};
