import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FieldArrayRenderProps } from 'formik';

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

export interface ITask {
   title: string;
   description: string;
   status: string;
   subtasks: {
      title: string;
      isCompleted: boolean;
   }[];
   completedSubtasks: number;
}

export interface ICol {
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
}

export interface IBoard {
   id: number;
   path: string;
   columns: {
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
   }[];
   name: string;
}

export interface ITask {
   id: number;
   completedSubtasks: number;
   title: string;
   description: string;
   status: string;
   subtasks: {
      title: string;
      isCompleted: boolean;
   }[];
}

export interface IFieldArray {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
}
