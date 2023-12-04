import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FieldArrayRenderProps } from 'formik';
import { Dispatch } from '@reduxjs/toolkit';

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

export interface INewSubtask {
   title: string;
}

export interface ISubtask extends INewSubtask {
   id: string;
   isCompleted: boolean;
}

export interface INewTask {
   title: string;
   description: string;
   status: string;
   subtasks: INewSubtask[];
}

export interface IEditTask extends INewTask {
   boardId: string;
}

export interface ITask extends INewTask {
   id: string;
   completedSubtasks: number;
   columnOptions: string[];
   subtasks: ISubtask[];
}

export interface IColumn {
   id: string;
   name: string;
   color: string;
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
