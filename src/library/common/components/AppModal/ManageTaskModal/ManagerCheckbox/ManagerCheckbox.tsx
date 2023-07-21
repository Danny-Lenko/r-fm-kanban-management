import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { assembleCheckboxStyles } from '../manageTaskModalStyles';

import { FormikProps, FormikValues, Formik } from 'formik';

import { SubtasksHeading } from '..';
import { Theme } from '@mui/system';

type Task = {
   id: number;
   completedSubtasks: number;
   title: string;
   description: string;
   status: string;
   subtasks: {
      title: string;
      isCompleted: boolean;
   }[];
};

type Props = {
   formik: FormikProps<FormikValues>;
   task: Task;
   theme: Theme;
};

export const ManagerCheckbox: React.FC<Props> = ({ formik, task, theme }) => {
   return (
      <>
         <SubtasksHeading variant='body2'>
            Subtasks ({task.completedSubtasks} of {task.subtasks.length})
         </SubtasksHeading>
         <FormGroup>
            {task.subtasks.map((sub: any) => (
               <FormControlLabel
                  key={sub.title}
                  sx={assembleCheckboxStyles(sub, theme)}
                  control={
                     <Checkbox
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
