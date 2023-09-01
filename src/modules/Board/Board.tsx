import { Typography, Stack } from '@mui/material';

import {
   CssBoard,
   CssScrollable,
   CssInteractiveScreen,
   CssColumn,
   CssColorLabel,
   CssColumnButton,
   TaskCard,
   useNewColumn,
} from '.';

export const Board = () => {
   const { columns, addNewColumn } = useNewColumn();

   return (
      <CssBoard>
         <CssScrollable>
            <CssInteractiveScreen>
               {columns.map((col) => {
                  const { name, color, tasks } = col;

                  return (
                     <CssColumn key={name} spacing={2.5}>
                        <Stack direction='row' spacing={1}>
                           <CssColorLabel color={color} />
                           <Typography
                              {...{ variant: 'h5', textTransform: 'uppercase' }}
                           >
                              {name} ({tasks.length})
                           </Typography>
                        </Stack>
                        {tasks.map((task) => (
                           <TaskCard key={task.title} {...task} />
                        ))}
                     </CssColumn>
                  );
               })}
            </CssInteractiveScreen>
         </CssScrollable>

         <CssColumnButton onClick={addNewColumn}>
            <Typography variant='h2'>+ New Column</Typography>
         </CssColumnButton>
      </CssBoard>
   );
};
