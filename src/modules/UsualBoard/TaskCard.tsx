import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ITask } from "../../library/interfaces/interfaces";
import useTheme from '@mui/material/styles/useTheme';

const TaskCard = ({task}: {task:ITask}) => {
   const theme = useTheme()

   const taskCardStyles = {
      py: 3,
      px: 2,
      '& .MuiTypography-h4': {
         color: theme.palette.text.primary,
         mb: 1
      },
      '& .MuiTypography-body2': {
         color: 'greyCustom.200'
      }
   }

   return (  
      <Paper sx={taskCardStyles}>
         <Typography variant='h4'>{task.title}</Typography>
         <Typography variant='body2'>0 of {task.subtasks.length} subtasks</Typography>
      </Paper>
   );
}
 
export default TaskCard;