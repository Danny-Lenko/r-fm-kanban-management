import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Typography, Stack } from '@mui/material';

import { CssColumn, CssColorLabel } from '.';

interface Props {
   name: string;
   color: string;
   tasksNum: number;
   children: React.ReactNode;
   provided: DraggableProvided;
}

export const Column: React.FC<Props> = React.memo(
   ({ name, color, tasksNum, children, provided }) => {
      return (
         <CssColumn
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
         >
            <Stack direction='row' spacing={1}>
               <CssColorLabel color={color} />
               <Typography
                  {...{
                     variant: 'h5',
                     textTransform: 'uppercase',
                  }}
               >
                  {name} ({tasksNum})
               </Typography>
            </Stack>
            {children}
         </CssColumn>
      );
   },
);
