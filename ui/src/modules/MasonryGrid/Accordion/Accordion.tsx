import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AccordionDetails, Stack, Paper } from "@mui/material";

import { CssAccordion, CssCreateButton } from ".";
import { BoardCard, Summary } from "..";
import { ICategory } from "../..";
import { useAppDispatch, useAppSelector } from "../../../library/common/hooks";
import {
  selectExpandedCategories,
  setActiveCategoryName,
  setBoardCreating,
  setExpandedCategories,
} from "../../../main/store";

interface Props {
  category: ICategory;
  idx: number;
}

export const Accordion: React.FC<Props> = ({ category: cat, idx }) => {
  const { category, boards } = cat;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const expandedCategories = useAppSelector(selectExpandedCategories);

  const expanded = expandedCategories.includes(idx);

  const handleChange = () => {
    if (expanded) {
      const categories = expandedCategories.filter((item) => item !== idx);
      return dispatch(setExpandedCategories(categories));
    }
    dispatch(setExpandedCategories([...expandedCategories, idx]));
  };

  const handleBoardDoubleClick = useCallback(
    (id: string) => {
      navigate(`/boards/${id}`);
      dispatch(setExpandedCategories([0]));
    },
    [dispatch, navigate]
  );

  const handleCreate = () => {
    dispatch(setBoardCreating(true));
    dispatch(setActiveCategoryName(category));
  };

  return (
    <Paper elevation={0}>
      <CssAccordion elevation={0} expanded={expanded} onChange={handleChange}>
        <Summary category={category} />
        <AccordionDetails>
          <Stack gap={2}>
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDoubleClick={() => handleBoardDoubleClick(board.id)}
              />
            ))}
          </Stack>
          <CssCreateButton onClick={handleCreate}>
            {"+ Create Board"}
          </CssCreateButton>
        </AccordionDetails>
      </CssAccordion>
    </Paper>
  );
};
