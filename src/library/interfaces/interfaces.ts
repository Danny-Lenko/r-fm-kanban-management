import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


export interface ICustomBtn {
   sizeSm: boolean
   color: string
   text: string
   onclick?: any
   styles?: Record<string, string | number>
   icon?: any
   iconStyles?: Record<string, string>
   type?: "button" | "submit" | "reset" | undefined
}

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