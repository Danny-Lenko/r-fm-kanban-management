import { ISubtask } from '../../../../interfaces';

export type FormValues = {
   title: string;
   description: string;
   subtasks: ISubtask[];
   status: string;
   columnOptions: string[];
};
