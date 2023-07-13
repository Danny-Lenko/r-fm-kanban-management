import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

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