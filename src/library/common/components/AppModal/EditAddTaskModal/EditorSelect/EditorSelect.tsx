import { MenuItem } from '@mui/material';
import { FormikValues } from 'formik';

import { Label } from '../..';
import { AppSelect } from '../../..';

type Col = {
   color: string;
   id: number;
   tasks: {
      id: number;
      completedSubtasks: number;
      title: string;
      description: string;
      status: string;
      subtasks: {
         title: string;
         isCompleted: boolean;
      }[];
   }[];
   name: string;
};

interface Props extends FormikValues {
   cols: Col[];
}

export const EditorSelect: React.FC<Props> = ({
   values,
   handleChange,
   cols,
}) => {
   return (
      <>
         <Label htmlFor='status'>Status</Label>
         <AppSelect
            id='status'
            name='status'
            value={values.status}
            onChange={handleChange}
         >
            {cols.map((col: Col) => (
               <MenuItem key={col.id} value={col.name}>
                  {col.name}
               </MenuItem>
            ))}
         </AppSelect>
      </>
   );
};
