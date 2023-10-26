import { FieldArrayRenderProps } from 'formik';
import { ISubtask } from '../../../../interfaces';

export type FormValues = {
   title: string;
   description: string;
   subtasks: ISubtask[];
   status: string;
   columnOptions: string[];
};

export type SubtaskProps = {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
   subtask: ISubtask;
   initialValue: ISubtask;
};
