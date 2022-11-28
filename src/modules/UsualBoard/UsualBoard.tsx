import { useAppSelector } from '../../library/common/hooks/hooks';
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';

const UsualBoard = () => {
   const drawerOpen = useAppSelector(state => state.drawer.open)
   const activeBoard = useAppSelector(state => state.data.activeBoard)
   const columns = activeBoard.columns
   const theme = useTheme()

   console.log(columns)

   const usualBoardStyles = {
      height: { xs: 'calc(100vh - 95px)', sm: 'calc(100vh - 110px)', md: 'calc(100vh - 130px)' },
      '& .cols-stack': {
         maxHeight: {xs: '100vh', md: '100vh'},
         overflowY: 'auto',
         overflowX: 'auto',
         maxWidth: { xs: '100vw', sm: drawerOpen ? '70vw' : '100vw', md: drawerOpen ? '55vw' : '70vw' },
         pb: 1,
         pr: 1,
         '& .MuiTypography-h5': {
            textTransform: 'uppercase'
         }
      },
      '& .rows-stack': {
         minWidth: '280px',
         maxWidth: '280px'
      },
      '& .add-col-btn': {
         borderRadius: '8px',
         textTransform: 'capitalize',
         width: '280px',
         backgroundColor: theme.palette.mode === 'light' ? '#E9EFFA' : '#2B2C37',
         '& .MuiTypography-root': {
            color: 'greyCustom.200'
         }
      }
   }

   return (
      <Stack direction='row' sx={usualBoardStyles} spacing={3}>
         <Stack className='cols-stack' direction='row' spacing={3}>
            {
               columns.map(col => <Stack key={col.name} className='rows-stack' spacing={2.5}>
                  <Box>
                     <Typography variant='h5'>{col.name} ({col.tasks.length})</Typography>
                  </Box>
                  {
                     col.tasks.map(task => <TaskCard key={task.title} task={task} />)
                  }
               </Stack>)
            }
         </Stack>
         <Button
            className='add-col-btn'
         >
            <Typography variant='h2'>
               + New Column
            </Typography>
         </Button>
      </Stack>
   );
}

export default UsualBoard;