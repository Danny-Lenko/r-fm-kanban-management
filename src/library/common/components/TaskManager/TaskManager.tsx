import Overlay from '../Overlay/Overlay';
import Box from '@mui/material/Box'
// import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/hooks';
import DotsMenu from '../DotsMenu/DotsMenu';
import { useTheme } from '@mui/material/styles';


const TaskManager = () => {
   const task = useAppSelector(state => state.data.managedTask)
   const theme = useTheme()
   console.log(task)

   const taskManageStyles = {
      zIndex: 11000,
      p: {xs: 3, sm: 4},
      borderRadius: '8px',
      width: {sm: '480px'},
      '& .heading': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         gap: '1rem',
         mb: 3,
         '& .MuiTypography-h3': {
            color: theme.palette.text.primary
         },
      },
      '& .MuiTypography-body1': {
         color: 'greyCustom.200',
         mb: 3
      },
      '& .subtasks-heading': {
         color: theme.palette.mode === 'light' ? 'greyCustom.200' : 'common.white'
      }
   }
   
   return (
      <Overlay>
         <Paper elevation={0} sx={taskManageStyles}>
            <Box className='heading'>
               <Typography variant='h3'>{task.title}</Typography>
               <DotsMenu />
            </Box>
            <Typography variant='body1'>{task.description}</Typography>
            <Typography 
               className='subtasks-heading' 
               variant='body2'
               >
                  Subtasks ({task.completedSubtasks} of {task.subtasks.length})
               </Typography>
         </Paper>
      </Overlay>
   );
}
 
export default TaskManager;