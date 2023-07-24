import { FormikProps, FormikValues } from 'formik';
import { Theme } from '@mui/system';
import { FormGroup } from '@mui/material';

import { StyledControlLabel, StyledCheckbox } from '.';
import { SubtasksHeading } from '..';

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
         <SubtasksHeading variant='body2'>
            Subtasks ({task.completedSubtasks} of {task.subtasks.length})
         </SubtasksHeading>
         <FormGroup>
            {task.subtasks.map((sub: Subtask) => (
               <StyledControlLabel
                  key={sub.title}
                  subtask={sub}
                  control={
                     <StyledCheckbox
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
