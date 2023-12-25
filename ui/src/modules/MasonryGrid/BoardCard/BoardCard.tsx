import React from 'react';
import { Typography } from '@mui/material';

import { CssCard, CssTitle, CssLabel, CssStack, CssDeleteBoardIcon } from '.';
import { IBoard } from '../../../library/interfaces';
import { useAppDispatch, useAppSelector } from '../../../library/common/hooks';
import {
   selectEditMode,
   setActiveBoardId,
   setDeleteModalMode,
} from '../../../main/store';
import { AppBtn } from '../../../library/common/components';

interface Props {
   board: IBoard;
   onDoubleClick: () => void;
}

export const BoardCard: React.FC<Props> = React.memo(
   ({ board, onDoubleClick }) => {
      const { name, columns, id } = board;

      const dispatch = useAppDispatch();
      const isEditMode = useAppSelector(selectEditMode);

      const handleDelete = () => {
         dispatch(setActiveBoardId(id));
         dispatch(setDeleteModalMode('board'));
      };

      return (
         <CssCard onDoubleClick={onDoubleClick}>
            <CssLabel>{'Board:'}</CssLabel>
            <CssTitle>{name}</CssTitle>
            {isEditMode && <CssDeleteBoardIcon onClick={handleDelete} />}
            <CssLabel>{'Columns:'}</CssLabel>
            <CssStack>
               {columns.map(({ name, id }) => (
                  <Typography key={id}>{name}</Typography>
               ))}
            </CssStack>
            <AppBtn>{'Create Board'}</AppBtn>
         </CssCard>
      );
   },
);
