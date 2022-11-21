import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


export interface ICustomBtn {
   sizeSm: boolean
   color: string
   text: string
}

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}