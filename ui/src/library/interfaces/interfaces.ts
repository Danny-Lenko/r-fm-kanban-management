import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FieldArrayRenderProps } from 'formik';
import { Dispatch } from '@reduxjs/toolkit';

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

export interface ISubtask {
   id: string;
   title: string;
   isCompleted: boolean;
}

export interface ITask {
   id: string;
   completedSubtasks: number;
   title: string;
   description: string;
   status: string;
   subtasks: ISubtask[];
   columnOptions: string[];
}

export interface IColumn {
   name: string;
   color: string;
   id: string;
   tasks: ITask[];
}

export interface IBoard {
   id: string;
   path: string;
   name: string;
   columns: IColumn[];
}

export interface IFieldArray {
   index: number;
   arrayHelpers: FieldArrayRenderProps;
   subtask?: ISubtask;
}

export interface ISumbissionParams {
   columns: IColumn[];
   boards: IBoard[];
   activeBoard: IBoard;
   activeBoardId: string;
   dispatch: Dispatch;
   activeTask: ITask | null;
   activeColumnId: string;
}
