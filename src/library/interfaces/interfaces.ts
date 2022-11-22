import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


export interface ICustomBtn {
   sizeSm: boolean
   color: string
   text: string
   onclick?: any
   styles?: Record<string, string | number>
   icon?: any
   iconStyles?: Record<string, string>
}

export interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}