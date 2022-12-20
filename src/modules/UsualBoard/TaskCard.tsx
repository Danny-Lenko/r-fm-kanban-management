import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ITask } from "../../library/interfaces/interfaces";
import useTheme from '@mui/material/styles/useTheme';
import { useAppDispatch } from '../../library/common/hooks/hooks';
import { assignActiveTaskCol } from "../../main/slices/dataSlice";
import { setTaskManaging } from "../../main/slices/modalElsSlice";

const TaskCard = ({task}: {task:ITask}) => {
   const dispatch = useAppDispatch()
   const theme = useTheme()

   const taskCardStyles = {
      py: 3,
      px: 2,
      cursor: 'pointer',
      zIndex: 100,
      boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
      '& .MuiTypography-h4': {
         color: theme.palette.text.primary,
         mb: 1
      },
      '& .MuiTypography-body2': {
         color: 'greyCustom.200'
      }
   }

   return (  
      <Paper 
         sx={taskCardStyles} 
         onClick={() => {
            dispatch(setTaskManaging(true))
            dispatch(assignActiveTaskCol(task))
         }}
      >
         <Typography variant='h4'>{task.title}</Typography>
         <Typography variant='body2'>{task.completedSubtasks} of {task.subtasks.length} subtasks</Typography>
      </Paper>
   );
}
 
export default TaskCard;