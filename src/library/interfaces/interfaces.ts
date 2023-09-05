import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FieldArrayRenderProps } from 'formik';
import { Dispatch } from '@reduxjs/toolkit';

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

// export interface ITask {
//    title: string;
//    description: string;
//    status: string;
//    subtasks: {
//       title: string;
//       isCompleted: boolean;
//    }[];
//    completedSubtasks: number;
// }

export interface ISubtask {
   title: string;
   isCompleted: boolean;
}

export interface ITask {
   id: number;
   completedSubtasks: number;
   title: string;
   description: string;
   status: string;
   subtasks: ISubtask[];
   // subtasks: {
   //    title: string;
   //    isCompleted: boolean;
   // }[];
}

export interface ICol {
   name: string;
   color: string;
   // id: number;
   id: string;
   tasks: ITask[];
   // tasks: {
   //    id: number;
   //    completedSubtasks: number;
   //    title: string;
   //    description: string;
   //    status: string;
   //    subtasks: {
   //       title: string;
   //       isCompleted: boolean;
   //    }[];
   // }[];
}

export interface IBoard {
   id: number;
   path: string;
   name: string;
   columns: ICol[];
   // columns: {
   //    color: string;
   //    id: number;
   //    tasks: {
   //       id: number;
   //       completedSubtasks: number;
   //       title: string;
   //       description: string;
   //       status: string;
   //       subtasks: {
   //          title: string;
   //          isCompleted: boolean;
   //       }[];
   //    }[];
   //    name: string;
   // }[];
}

export interface IFieldArray {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
}

export interface ISumbissionParams {
   columns: ICol[];
   boards: IBoard[];
   activeBoard: IBoard;
   activeBoardId: number;
   dispatch: Dispatch;
   activeTask: ITask;
   activeColumnId: string;
}
