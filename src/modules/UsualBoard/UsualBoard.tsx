import { useAppSelector } from '../../library/common/hooks/hooks';
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack'


const UsualBoard = () => {
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const columns = activeBoard.columns

   console.log(columns)

   return (
      <>
         <Stack direction='row' spacing={3}>
            {
               columns.map(col => <Stack spacing={2.5} sx={{width: '280px'}}>
                  {
                     col.tasks.map(task => <TaskCard task={task} />)
                  }
               </Stack>)
            }
         </Stack>
      </>
   );
}

export default UsualBoard;