import { FormikProps, FormikValues } from 'formik';
import { Theme } from '@mui/system';
import { FormGroup } from '@mui/material';

import { CssControlLabel, CssCheckbox } from '.';
import { CssLabel } from '../..';

type Props = {
   formik: FormikProps<FormikValues>;
   task: Task;
   theme: Theme;
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

export const ManagerCheckbox: React.FC<Props> = ({ formik, task }) => {
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
