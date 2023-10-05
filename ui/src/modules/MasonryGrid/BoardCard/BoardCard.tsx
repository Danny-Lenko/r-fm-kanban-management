import React from 'react';
import { Typography } from '@mui/material';

import { CssCard, CssTitle, CssSubtasks, CssStack } from '.';
import { IBoard } from '../../../library/interfaces';

interface Props {
   board: IBoard;
   onDoubleClick: () => void;
}

export const BoardCard: React.FC<Props> = React.memo(
   ({ board, onDoubleClick }) => {
      const { name, columns } = board;

      return (
         <CssCard onDoubleClick={onDoubleClick}>
            <CssSubtasks>{'Board:'}</CssSubtasks>
            <CssTitle>{name}</CssTitle>
            <CssSubtasks>{'Columns:'}</CssSubtasks>
            <CssStack>
               {columns.map(({ name, id }) => (
                  <Typography key={id}>{name}</Typography>
               ))}
            </CssStack>
         </CssCard>
      );
   },
);
